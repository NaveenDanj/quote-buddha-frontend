import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { useRef, type ReactNode } from 'react'
import { IconButton } from '@ds/atoms/IconButton'

const defaultCloseLabel = 'Close'

type DialogSize = 'small' | 'palette' | 'graph'

const sizeClass: Record<DialogSize, string> = {
  small: 'max-w-(--layout-dialog-small)',
  palette: 'max-w-(--layout-dialog-palette)',
  graph: 'max-w-(--layout-dialog-graph)',
}

type DialogProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
  description?: string
  size?: DialogSize
  closeLabel?: string
  children: ReactNode
}

export function Dialog({
  isOpen,
  onOpenChange,
  title,
  description,
  size = 'small',
  closeLabel = defaultCloseLabel,
  children,
}: DialogProps) {
  // This dialog is opened by the parent (isOpen), so Radix does not know which button opened it.
  // We remember the focused element as the dialog opens, and give focus back when it closes.
  const openerRef = useRef<HTMLElement | null>(null)

  function rememberOpener() {
    const focused = document.activeElement
    openerRef.current = focused instanceof HTMLElement ? focused : null
  }

  function returnFocusToOpener(event: Event) {
    event.preventDefault()
    // The opener can be gone (for example, a menu item that closed with the menu).
    if (openerRef.current?.isConnected) {
      openerRef.current.focus()
    }
  }

  const descriptionProps = description ? {} : { 'aria-describedby': undefined }

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-(--z-dialog) grid place-items-center overflow-y-auto bg-scrim p-(--gutter)">
          <RadixDialog.Content
            {...descriptionProps}
            onOpenAutoFocus={rememberOpener}
            onCloseAutoFocus={returnFocusToOpener}
            className={clsx(
              'relative w-full rounded border border-text-muted bg-page p-5 text-text',
              sizeClass[size],
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <RadixDialog.Title className="font-reading text-heading-3 font-medium">
                {title}
              </RadixDialog.Title>
              <RadixDialog.Close asChild>
                <IconButton icon="close" label={closeLabel} size="small" />
              </RadixDialog.Close>
            </div>
            {description ? (
              <RadixDialog.Description className="pt-2 font-ui text-caption text-text-muted">
                {description}
              </RadixDialog.Description>
            ) : null}
            <div className="pt-4">{children}</div>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
