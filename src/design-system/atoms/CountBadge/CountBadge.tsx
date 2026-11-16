import clsx from 'clsx'
import { VisuallyHidden } from '@ds/atoms/VisuallyHidden'

type CountBadgeProps = {
  count: number
  // What is being counted ("notes"). Read out after the number so the number has a meaning.
  label?: string
  className?: string
}

// A small count, for example on a notes button. Place it with className where it is used.
export function CountBadge({ count, label, className }: CountBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-grid h-(--badge-size) min-w-(--badge-size) place-items-center rounded px-1',
        'bg-inverse-bg font-code text-stamp leading-none text-inverse-text',
        className,
      )}
    >
      <span aria-hidden={label ? true : undefined}>{count}</span>
      {label ? <VisuallyHidden>{`${count} ${label}`}</VisuallyHidden> : null}
    </span>
  )
}
