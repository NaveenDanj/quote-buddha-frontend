import { useEffect, useState } from 'react'

export type ThemeChoice = 'system' | 'light' | 'dark'

export function toThemeChoice(value: unknown): ThemeChoice {
  if (value === 'light' || value === 'dark') {
    return value
  }
  return 'system'
}

const storageKey = 'quote-buddha-theme'

export function readSavedTheme(): ThemeChoice {
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved === 'light' || saved === 'dark') {
      return saved
    }
  } catch {
    // Storage can be blocked (private window, site data off). Fall back to the system setting.
  }
  return 'system'
}

function saveTheme(choice: ThemeChoice) {
  try {
    if (choice === 'system') {
      localStorage.removeItem(storageKey)
    } else {
      localStorage.setItem(storageKey, choice)
    }
  } catch {
    // The theme still changes for this visit. It just will not be remembered.
  }
}

// "system" removes the attribute, so the browser setting decides.
export function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement
  if (choice === 'system') {
    root.removeAttribute('data-theme')
    return
  }
  root.setAttribute('data-theme', choice)
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeChoice>(readSavedTheme)

  // Puts the saved choice on the page when the app starts, and keeps the page in step after that.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function setTheme(choice: ThemeChoice) {
    setThemeState(choice)
    saveTheme(choice)
  }

  return { theme, setTheme }
}
