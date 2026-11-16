import clsx from 'clsx'
import { useId, type ComponentProps } from 'react'
import { Field, getDescribedBy } from '@ds/atoms/Field'

// The kinds of one-line text field. Checkboxes and files have their own atoms.
type InputType = 'text' | 'email' | 'search' | 'url' | 'password' | 'number'

type InputProps = Omit<ComponentProps<'input'>, 'id' | 'type' | 'aria-describedby'> & {
  type?: InputType

  label: string
  isLabelHidden?: boolean
  hint?: string
  // Showing error text marks the field as invalid. The text says what is wrong, not only the color.
  errorText?: string
}

export function Input({
  label,
  isLabelHidden,
  hint,
  errorText,
  className,
  type = 'text',
  ...inputProps
}: InputProps) {
  const inputId = useId()

  return (
    <Field
      controlId={inputId}
      label={label}
      isLabelHidden={isLabelHidden}
      hint={hint}
      errorText={errorText}
    >
      <input
        {...inputProps}
        id={inputId}
        type={type}
        aria-invalid={errorText ? true : undefined}
        aria-describedby={getDescribedBy(inputId, hint, errorText)}
        className={clsx(
          'h-(--control-field) w-full rounded border bg-page px-3 font-ui text-input text-text',
          'placeholder:text-text-muted focus:border-text',
          'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
          errorText ? 'border-danger' : 'border-text-muted',
          className,
        )}
      />
    </Field>
  )
}
