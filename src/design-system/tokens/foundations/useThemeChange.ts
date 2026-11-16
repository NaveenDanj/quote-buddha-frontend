import { useEffect, useState } from 'react'

// Returns a number that goes up whenever the theme changes (toolbar, toggle, or the system setting),
// so a docs page that reads live token values draws itself again.
export function useThemeChange(): number {
  const [changeCount, setChangeCount] = useState(0)

  useEffect(() => {
    function onThemeChange() {
      setChangeCount((current) => current + 1)
    }

    const watcher = new MutationObserver(onThemeChange)
    watcher.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const systemSetting = window.matchMedia('(prefers-color-scheme: dark)')
    systemSetting.addEventListener('change', onThemeChange)

    return () => {
      watcher.disconnect()
      systemSetting.removeEventListener('change', onThemeChange)
    }
  }, [])

  return changeCount
}
