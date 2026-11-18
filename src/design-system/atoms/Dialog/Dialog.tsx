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
  // A flush dialog has no visible title bar or close button and no padding, and sits near the top.
  // The title is still there for screen readers, and Escape still closes it.
  isFlush?: boolean
  children: ReactNode
}

type DialogHeaderProps = Pick<DialogProps, 'title' | 'description' | 'closeLabel'>

function DialogHeader({ title, description, closeLabel }: DialogHeaderProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <RadixDialog.Title className="font-reading text-heading-3 font-medium">
          {title}
        </RadixDialog.Title>
        <RadixDialog.Close asChild>
          <IconButton icon="close" label={closeLabel ?? defaultCloseLabel} size="small" />
        </RadixDialog.Close>
      </div>
      {description ? (
        <RadixDialog.Description className="pt-2 font-ui text-caption text-text-muted">
          {description}
        </RadixDialog.Description>
      ) : null}
    </>
  )
}

export function Dialog({
  isOpen,
  onOpenChange,
  title,
  description,
  size = 'small',
  closeLabel,
  isFlush = false,
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
        <RadixDialog.Overlay
          className={clsx(
            'fixed inset-0 z-(--z-dialog) grid overflow-y-auto bg-scrim p-(--gutter)',
            isFlush ? 'place-items-start justify-items-center pt-7' : 'place-items-center',
          )}
        >
          <RadixDialog.Content
            {...descriptionProps}
            onOpenAutoFocus={rememberOpener}
            onCloseAutoFocus={returnFocusToOpener}
            className={clsx(
              'relative w-full rounded border border-text-muted bg-page text-text',
              isFlush ? '' : 'p-5',
              sizeClass[size],
            )}
          >
            {isFlush ? (
              <RadixDialog.Title className="sr-only">{title}</RadixDialog.Title>
            ) : (
              <DialogHeader title={title} description={description} closeLabel={closeLabel} />
            )}
            <div className={isFlush ? undefined : 'pt-4'}>{children}</div>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
