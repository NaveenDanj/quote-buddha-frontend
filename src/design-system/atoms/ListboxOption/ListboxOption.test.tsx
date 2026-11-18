import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ListboxOption } from './ListboxOption'

describe('ListboxOption', () => {
  it('says whether it is the highlighted option', () => {
    render(
      <div role="listbox" aria-label="Sample">
        <ListboxOption isHighlighted>First</ListboxOption>
        <ListboxOption isHighlighted={false}>Second</ListboxOption>
      </div>,
    )
    expect(screen.getByRole('option', { name: 'First' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('option', { name: 'Second' })).toHaveAttribute('aria-selected', 'false')
  })
})
