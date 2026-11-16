import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Stamp } from './Stamp'

describe('Stamp', () => {
  it('shows a caption as plain text', () => {
    render(<Stamp>corpus v1</Stamp>)
    expect(screen.getByText('corpus v1').tagName).toBe('SPAN')
  })

  it('uses the keyboard element for a key hint', () => {
    render(<Stamp isKey>Ctrl K</Stamp>)
    expect(screen.getByText('Ctrl K').tagName).toBe('KBD')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <Stamp>corpus v1</Stamp>
        <Stamp isKey>Ctrl K</Stamp>
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
