import clsx from 'clsx'
import { useId, type ComponentProps } from 'react'
import { Field, getDescribedBy } from '@ds/atoms/Field'
import { getTextClass } from '@ds/atoms/Text'

const defaultRowCount = 3

export const TextareaLook = {
  boxed: 'boxed',
  bare: 'bare',
} as const

export type TextareaLook = (typeof TextareaLook)[keyof typeof TextareaLook]

const lookClass: Record<TextareaLook, string> = {
  boxed: `w-full resize-y rounded border bg-page px-3 py-3 ${getTextClass('input')} text-text focus:border-text`,
  bare: `w-full resize-none border-0 bg-transparent px-4 pt-3 pb-2 ${getTextClass('readingInput')} text-text focus-visible:outline-0`,
}

type TextareaProps = Omit<ComponentProps<'textarea'>, 'id' | 'aria-describedby'> & {
  label: string
  isLabelHidden?: boolean
  look?: TextareaLook
  hint?: string
  errorText?: string
  describedById?: string
}

function joinIds(first: string | undefined, second: string | undefined): string | undefined {
  const ids = [first, second].filter((id) => id !== undefined)
  return ids.length > 0 ? ids.join(' ') : undefined
}

export function Textarea({
  label,
  isLabelHidden,
  look = TextareaLook.boxed,
  hint,
  errorText,
  describedById,
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
        aria-describedby={joinIds(getDescribedBy(textareaId, hint, errorText), describedById)}
        className={clsx(
          lookClass[look],
          'placeholder:text-text-muted',
          'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
          look === TextareaLook.boxed && (errorText ? 'border-danger' : 'border-text-muted'),
          className,
        )}
      />
    </Field>
  )
}
