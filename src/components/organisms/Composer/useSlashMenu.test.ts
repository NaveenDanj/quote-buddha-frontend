import { act, renderHook } from '@testing-library/react'
import type { KeyboardEvent } from 'react'
import { describe, expect, it, vi } from 'vitest'
import type { SlashCommand } from '@domain'
import { Key } from '@keyboard'
import { useSlashMenu } from './useSlashMenu'

const commands: SlashCommand[] = [
  { id: 'verify', name: 'verify', label: 'Check a quote' },
  { id: 'reader', name: 'reader', label: 'Open the Reader' },
  { id: 'terms', name: 'terms', label: 'Look up a term' },
]

function makeKeyEvent(key: string, isComposing = false) {
  return {
    key,
    nativeEvent: { isComposing },
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
  } as unknown as KeyboardEvent<HTMLElement>
}

function setUp(initialValue: string) {
  const onRunCommand = vi.fn()
  const hook = renderHook(({ value }) => useSlashMenu({ value, commands, onRunCommand }), {
    initialProps: { value: initialValue },
  })
  return { ...hook, onRunCommand }
}

function press(hook: ReturnType<typeof setUp>, key: string, isComposing = false): boolean {
  let wasUsed = false
  act(() => {
    wasUsed = hook.result.current.handleKey(makeKeyEvent(key, isComposing))
  })
  return wasUsed
}

describe('useSlashMenu', () => {
  it('is closed for an ordinary question and leaves every key alone', () => {
    const hook = setUp('What is craving?')
    expect(hook.result.current.isOpen).toBe(false)
    expect(hook.result.current.highlightedCommand).toBeUndefined()
    expect(press(hook, Key.enter)).toBe(false)
  })

  it('opens on a slash with every command and the first one lit', () => {
    const hook = setUp('/')
    expect(hook.result.current.isOpen).toBe(true)
    expect(hook.result.current.matches).toHaveLength(3)
    expect(hook.result.current.highlightedCommand?.id).toBe('verify')
  })

  it('moves the lit row with the arrow keys and wraps at both ends', () => {
    const hook = setUp('/')
    press(hook, Key.arrowDown)
    expect(hook.result.current.highlightedCommand?.id).toBe('reader')
    press(hook, Key.arrowUp)
    press(hook, Key.arrowUp)
    expect(hook.result.current.highlightedCommand?.id).toBe('terms')
    press(hook, Key.arrowDown)
    expect(hook.result.current.highlightedCommand?.id).toBe('verify')
  })

  it('runs the lit command on Enter and keeps the key from also sending the question', () => {
    const hook = setUp('/')
    press(hook, Key.arrowDown)
    const event = makeKeyEvent(Key.enter)
    act(() => {
      hook.result.current.handleKey(event)
    })
    expect(hook.onRunCommand).toHaveBeenCalledWith(commands[1])
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('never uses Tab, so the person can always move on', () => {
    const hook = setUp('/')
    expect(press(hook, Key.tab)).toBe(false)
    expect(hook.onRunCommand).not.toHaveBeenCalled()
  })

  it('closes on Escape and stays closed until the text changes', () => {
    const hook = setUp('/ver')
    press(hook, Key.escape)
    expect(hook.result.current.isOpen).toBe(false)
    expect(hook.result.current.highlightedCommand).toBeUndefined()

    hook.rerender({ value: '/verif' })
    expect(hook.result.current.isOpen).toBe(true)
  })

  it('starts again from the first row when the query changes', () => {
    const hook = setUp('/')
    press(hook, Key.arrowDown)
    hook.rerender({ value: '/e' })
    expect(hook.result.current.highlightedCommand?.id).toBe(hook.result.current.matches[0]?.id)
  })

  it('stays closed when nothing matches', () => {
    expect(setUp('/zzz').result.current.isOpen).toBe(false)
  })

  it('leaves the keys to the input method while a character is being composed', () => {
    const hook = setUp('/')
    expect(press(hook, Key.enter, true)).toBe(false)
    expect(hook.onRunCommand).not.toHaveBeenCalled()
  })
})
