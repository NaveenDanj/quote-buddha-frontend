import clsx from 'clsx'
import type { ReactNode } from 'react'
import { VisuallyHidden } from '../VisuallyHidden'

type FieldProps = {
  // The id of the control inside. The label points at it.
  controlId: string
  label: string
  // Hide the label visually when the surrounding design already explains the field. It stays for screen readers.
  isLabelHidden?: boolean
  hint?: string
  errorText?: string
  className?: string
  children: ReactNode
}

export function getHintId(controlId: string): string {
  return `${controlId}-hint`
}

export function getErrorId(controlId: string): string {
  return `${controlId}-error`
}

// Which hint and error texts a control should point at with aria-describedby.
export function getDescribedBy(
  controlId: string,
  hint: string | undefined,
  errorText: string | undefined,
): string | undefined {
  const ids: string[] = []
  if (hint) {
    ids.push(getHintId(controlId))
  }
  if (errorText) {
    ids.push(getErrorId(controlId))
  }
  return ids.length > 0 ? ids.join(' ') : undefined
}

// The label, hint and error text around one form control.
export function Field({
  controlId,
  label,
  isLabelHidden = false,
  hint,
  errorText,
  className,
  children,
}: FieldProps) {
  return (
    <div className={clsx('grid gap-2', className)}>
      {isLabelHidden ? (
        <label htmlFor={controlId}>
          <VisuallyHidden>{label}</VisuallyHidden>
        </label>
      ) : (
        <label htmlFor={controlId} className="font-ui text-ui font-medium text-text">
          {label}
        </label>
      )}
      {children}
      {hint ? (
        <p id={getHintId(controlId)} className="font-ui text-caption text-text-muted">
          {hint}
        </p>
      ) : null}
      {errorText ? (
        <p id={getErrorId(controlId)} className="font-ui text-caption font-medium text-danger">
          {errorText}
        </p>
      ) : null}
    </div>
  )
}
