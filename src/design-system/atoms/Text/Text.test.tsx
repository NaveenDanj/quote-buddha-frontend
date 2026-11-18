import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Text, getTextClass } from './Text'

describe('Text', () => {
  it('uses a heading element for heading variants', () => {
    render(<Text variant="heading2">Evidence matrix</Text>)
    expect(screen.getByRole('heading', { level: 2, name: 'Evidence matrix' })).toBeInTheDocument()
  })

  it('lets the page choose a different heading level', () => {
    render(
      <Text variant="heading2" as="h3">
        Claim 1
      </Text>,
    )
    expect(screen.getByRole('heading', { level: 3, name: 'Claim 1' })).toBeInTheDocument()
  })

  it('marks Pali text with its language', () => {
    render(<Text variant="pali">Evaṃ me sutaṃ</Text>)
    expect(screen.getByText('Evaṃ me sutaṃ')).toHaveAttribute('lang', 'pi')
  })

  it('does not set a language on other text', () => {
    render(<Text variant="reading">Sample sentence</Text>)
    expect(screen.getByText('Sample sentence')).not.toHaveAttribute('lang')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <Text variant="heading1">Title</Text>
        <Text variant="pali">Evaṃ me sutaṃ</Text>
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('gives a button the same classes as the Text component', () => {
    render(<Text variant="code">sample</Text>)
    for (const className of getTextClass('code').split(' ')) {
      expect(screen.getByText('sample')).toHaveClass(className)
    }
  })

  it('lets a weight replace the weight of the variant', () => {
    expect(getTextClass('label')).toContain('font-semibold')
    expect(getTextClass('label', 'medium')).toContain('font-medium')
    expect(getTextClass('label', 'medium')).not.toContain('font-semibold')
  })
})
