import * as RadixCheckbox from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { useId } from 'react'
import { Icon } from '@ds/atoms/Icon'

type CheckboxProps = {
  label: string
  // The name used when the checkbox is inside a form that is submitted.
  name?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onCheckedChange?: (isChecked: boolean) => void
  className?: string
}

// The check mark is a drawn shape, so "checked" is never shown by color alone.
export function Checkbox({
  label,
  name,
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
  className,
}: CheckboxProps) {
  const checkboxId = useId()

  function reportCheckedChange(state: RadixCheckbox.CheckedState) {
    onCheckedChange?.(state === true)
  }

  return (
    <div
      className={clsx(
        'flex items-center gap-3',
        disabled && 'opacity-(--opacity-disabled)',
        className,
      )}
    >
      <RadixCheckbox.Root
        id={checkboxId}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={reportCheckedChange}
        className={clsx(
          'inline-grid size-(--icon-large) shrink-0 cursor-pointer place-items-center rounded border border-text-muted bg-page',
          'data-[state=checked]:border-text data-[state=checked]:bg-text data-[state=checked]:text-page',
          'disabled:cursor-not-allowed',
        )}
      >
        <RadixCheckbox.Indicator>
          <Icon name="done" size="small" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label
        htmlFor={checkboxId}
        className={clsx('font-ui text-ui text-text', !disabled && 'cursor-pointer')}
      >
        {label}
      </label>
    </div>
  )
}
