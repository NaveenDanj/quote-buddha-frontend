import { useEffect, useRef, type RefObject } from 'react'

// When a drawer opens, focus moves into it. When it closes, focus goes back to what opened it.
export function useDrawerFocus(isOpen: boolean, drawerRef: RefObject<HTMLElement | null>) {
  const openerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const focusedElement = document.activeElement
    openerRef.current = focusedElement instanceof HTMLElement ? focusedElement : null
    drawerRef.current?.focus()

    return () => {
      openerRef.current?.focus()
    }
  }, [isOpen, drawerRef])
}
