import { useEffect, useState } from 'react'
import { Key } from '@keyboard'

export function useWorkspaceDialogs() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    function openSearchOnShortcut(event: KeyboardEvent) {
      const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === Key.letterK
      if (isShortcut) {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }
    document.addEventListener('keydown', openSearchOnShortcut)
    return () => document.removeEventListener('keydown', openSearchOnShortcut)
  }, [])

  return { isSearchOpen, setIsSearchOpen, isSettingsOpen, setIsSettingsOpen }
}
