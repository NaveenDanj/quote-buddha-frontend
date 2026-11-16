import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from './theme'

afterEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  vi.restoreAllMocks()
})

describe('useTheme', () => {
  it('starts on system and leaves the attribute off', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('system')
    expect(document.documentElement).not.toHaveAttribute('data-theme')
  })

  it('sets the attribute and remembers a chosen theme', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.setTheme('dark'))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('quote-buddha-theme')).toBe('dark')
  })

  it('removes the attribute and the saved choice when going back to system', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.setTheme('light'))
    act(() => result.current.setTheme('system'))
    expect(document.documentElement).not.toHaveAttribute('data-theme')
    expect(localStorage.getItem('quote-buddha-theme')).toBeNull()
  })

  it('reads a saved choice on start', () => {
    localStorage.setItem('quote-buddha-theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('puts a saved choice on the page when the app starts', () => {
    localStorage.setItem('quote-buddha-theme', 'dark')
    renderHook(() => useTheme())
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('still works when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('system')
    act(() => result.current.setTheme('dark'))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })
})
