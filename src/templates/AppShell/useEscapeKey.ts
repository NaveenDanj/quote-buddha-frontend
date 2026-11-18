import { useEffect, type RefObject } from 'react'
import { Key } from '@keyboard'

// Calls onEscape when Escape is pressed inside the given area. Escape pressed in a dialog or a menu
// that is drawn outside the area belongs to that dialog or menu, so it is ignored here.
export function useEscapeKey(areaRef: RefObject<HTMLElement | null>, onEscape: () => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isInsideArea = areaRef.current?.contains(event.target as Node)
      if (event.key === Key.escape && isInsideArea) {
        onEscape()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [areaRef, onEscape])
}
