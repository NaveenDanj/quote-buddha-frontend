import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Text } from './Text'

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
})
