import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Tabs } from './Tabs'

const sampleTabs = [
  { value: 'sources', label: 'Sources', panel: <p>Sample sources list</p> },
  { value: 'evidence', label: 'Evidence', panel: <p>Sample evidence matrix</p> },
  { value: 'notes', label: 'Notes', panel: <p>Sample notes</p> },
]

describe('Tabs', () => {
  it('shows the first tab and its panel to begin with', () => {
    render(<Tabs label="Research panel" tabs={sampleTabs} />)
    expect(screen.getByRole('tab', { name: 'Sources' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Sample sources list')
  })

  it('names the group of tabs', () => {
    render(<Tabs label="Research panel" tabs={sampleTabs} />)
    expect(screen.getByRole('tablist', { name: 'Research panel' })).toBeInTheDocument()
  })

  it('changes panel when a tab is clicked and reports the change', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<Tabs label="Research panel" tabs={sampleTabs} onValueChange={onValueChange} />)

    await user.click(screen.getByRole('tab', { name: 'Evidence' }))

    expect(onValueChange).toHaveBeenCalledWith('evidence')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Sample evidence matrix')
  })

  it('moves between tabs with the arrow keys', async () => {
    const user = userEvent.setup()
    render(<Tabs label="Research panel" tabs={sampleTabs} />)

    await user.tab()
    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('tab', { name: 'Evidence' })).toHaveFocus()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Sample evidence matrix')
  })

  it('can start on another tab', () => {
    render(<Tabs label="Research panel" tabs={sampleTabs} defaultValue="notes" />)
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Sample notes')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Tabs label="Research panel" tabs={sampleTabs} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
