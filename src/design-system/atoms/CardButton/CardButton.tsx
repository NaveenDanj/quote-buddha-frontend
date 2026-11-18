import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type CardButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

// A box that can be pressed, with a few lines inside it. The caller sets the padding, border color and size.
export function CardButton({
  className,
  type = 'button',
  children,
  ...buttonProps
}: CardButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'grid cursor-pointer rounded border text-left transition-colors duration-(--motion-fast)',
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
