import * as RadixCheckbox from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { useId } from 'react'
import { Icon } from '@ds/atoms/Icon'

type CheckboxProps = {
  label: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onCheckedChange?: (isChecked: boolean) => void
  className?: string
}

// The check mark is a drawn shape, so "checked" is never shown by color alone.
export function Checkbox({
  label,
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
  className,
}: CheckboxProps) {
  const checkboxId = useId()

  function onChange(state: RadixCheckbox.CheckedState) {
    onCheckedChange?.(state === true)
  }

  return (
    <div className={clsx('flex items-center gap-3', disabled && 'opacity-35', className)}>
      <RadixCheckbox.Root
        id={checkboxId}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onChange}
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
      <label htmlFor={checkboxId} className="cursor-pointer font-ui text-ui text-text">
        {label}
      </label>
    </div>
  )
}
