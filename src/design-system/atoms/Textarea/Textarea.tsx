import clsx from 'clsx'
import { useId, type ComponentProps } from 'react'
import { Field, getDescribedBy } from '@ds/atoms/Field'

const defaultRowCount = 3

type TextareaProps = Omit<ComponentProps<'textarea'>, 'id' | 'aria-describedby'> & {
  label: string
  isLabelHidden?: boolean
  hint?: string
  errorText?: string
}

// Also the base of the chat composer, so it passes `ref` and every textarea prop through.
export function Textarea({
  label,
  isLabelHidden,
  hint,
  errorText,
  className,
  rows = defaultRowCount,
  ...textareaProps
}: TextareaProps) {
  const textareaId = useId()

  return (
    <Field
      controlId={textareaId}
      label={label}
      isLabelHidden={isLabelHidden}
      hint={hint}
      errorText={errorText}
    >
      <textarea
        {...textareaProps}
        id={textareaId}
        rows={rows}
        aria-invalid={errorText ? true : undefined}
        aria-describedby={getDescribedBy(textareaId, hint, errorText)}
        className={clsx(
          'w-full resize-y rounded border bg-page px-3 py-3 font-ui text-input text-text',
          'placeholder:text-text-muted focus:border-text',
          'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
          errorText ? 'border-danger' : 'border-text-muted',
          className,
        )}
      />
    </Field>
  )
}
