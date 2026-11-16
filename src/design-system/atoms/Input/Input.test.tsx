import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('is found by its label and accepts typing', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Input label="Search the texts" onChange={onChange} />)

    await user.type(screen.getByLabelText('Search the texts'), 'craving')

    expect(screen.getByLabelText('Search the texts')).toHaveValue('craving')
    expect(onChange).toHaveBeenCalled()
  })

  it('points at its hint', () => {
    render(<Input label="Search" hint="Pali words work too" />)
    expect(screen.getByLabelText('Search')).toHaveAccessibleDescription('Pali words work too')
  })

  it('is marked invalid and explains why when there is an error', () => {
    render(<Input label="Search" errorText="Enter at least two letters." />)
    const input = screen.getByLabelText('Search')
    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription('Enter at least two letters.')
  })

  it('is not marked invalid without an error', () => {
    render(<Input label="Search" />)
    expect(screen.getByLabelText('Search')).toBeValid()
  })

  it('cannot be typed in when disabled', async () => {
    const user = userEvent.setup()
    render(<Input label="Search" disabled />)
    await user.type(screen.getByLabelText('Search'), 'abc')
    expect(screen.getByLabelText('Search')).toHaveValue('')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Input label="Search" hint="Pali words work too" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
