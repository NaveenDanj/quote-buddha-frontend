import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('is found by its label and accepts several lines', async () => {
    const user = userEvent.setup()
    render(<Textarea label="Your note" />)

    await user.type(screen.getByLabelText('Your note'), 'first{Enter}second')

    expect(screen.getByLabelText('Your note')).toHaveValue('first\nsecond')
  })

  it('gives the textarea to a ref, so the composer can focus it', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea label="Your note" ref={ref} />)
    expect(ref.current).toBe(screen.getByLabelText('Your note'))
  })

  it('is marked invalid and explains why when there is an error', () => {
    render(<Textarea label="Your note" errorText="A note cannot be empty." />)
    const textarea = screen.getByLabelText('Your note')
    expect(textarea).toBeInvalid()
    expect(textarea).toHaveAccessibleDescription('A note cannot be empty.')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Textarea label="Your note" hint="Notes are private." />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
