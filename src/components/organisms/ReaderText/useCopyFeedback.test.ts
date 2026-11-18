import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useCopyFeedback } from './useCopyFeedback'

describe('useCopyFeedback', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('copies the text and remembers which button did it for a moment', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    const { result } = renderHook(() => useCopyFeedback())

    await act(async () => {
      await result.current.copy('DN 1 · 1.1', 'citation')
    })
    expect(writeText).toHaveBeenCalledWith('DN 1 · 1.1')
    expect(result.current.copiedKey).toBe('citation')

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.copiedKey).toBeUndefined()
  })

  it('shows nothing when copying is not allowed', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('blocked'))
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    const { result } = renderHook(() => useCopyFeedback())

    await act(async () => {
      await result.current.copy('text', 'link')
    })
    expect(result.current.copiedKey).toBeUndefined()
  })
})
