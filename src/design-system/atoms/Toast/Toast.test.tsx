import { act, render, screen, waitFor } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Toast } from './Toast'

afterEach(() => {
  vi.useRealTimers()
})

// axe's "content must be in a landmark" rule is about whole pages, so it is off for a single component.
const componentCheckOptions = { rules: { region: { enabled: false } } }

describe('Toast', () => {
  it('shows its message, and announces it politely to screen readers', async () => {
    render(<Toast isOpen onOpenChange={() => {}} message="Link copied" />)
    expect(screen.getByText('Link copied')).toBeInTheDocument()
    // Radix fills the hidden announcement area one frame later.
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Link copied'))
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  })

  it('shows nothing when closed', () => {
    render(<Toast isOpen={false} onOpenChange={() => {}} message="Link copied" />)
    expect(screen.queryByText('Link copied')).not.toBeInTheDocument()
  })

  it('asks to close itself after its time is up', () => {
    vi.useFakeTimers()
    const onOpenChange = vi.fn()
    render(
      <Toast
        isOpen
        onOpenChange={onOpenChange}
        message="Link copied"
        durationInMilliseconds={1000}
      />,
    )

    act(() => {
      vi.advanceTimersByTime(1500)
    })

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('has no accessibility violations', async () => {
    render(<Toast isOpen onOpenChange={() => {}} message="Link copied" />)
    expect(await axe(document.body, componentCheckOptions)).toHaveNoViolations()
  })
})
