import * as RadixToast from '@radix-ui/react-toast'

const defaultDurationInMilliseconds = 4000
const viewportLabel = 'Notifications'

type ToastProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  message: string
  durationInMilliseconds?: number
}

export function Toast({
  isOpen,
  onOpenChange,
  message,
  durationInMilliseconds = defaultDurationInMilliseconds,
}: ToastProps) {
  return (
    <RadixToast.Provider duration={durationInMilliseconds} label={viewportLabel}>
      <RadixToast.Root
        type="background"
        open={isOpen}
        onOpenChange={onOpenChange}
        className="max-w-(--layout-dialog-small) rounded bg-inverse-bg px-4 py-3 font-ui text-ui text-inverse-text"
      >
        <RadixToast.Description>{message}</RadixToast.Description>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-(--gutter) left-1/2 z-(--z-toast) -translate-x-1/2" />
    </RadixToast.Provider>
  )
}
