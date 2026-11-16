import * as RadixSelect from '@radix-ui/react-select'
import clsx from 'clsx'
import { useId } from 'react'
import { Field, getDescribedBy } from '@ds/atoms/Field'
import { popupGapInPixels, popupSurfaceClass } from '@ds/atoms/popupLook'
import { Icon } from '@ds/atoms/Icon'

const defaultPlaceholder = 'Choose one'

export type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  label: string
  isLabelHidden?: boolean
  hint?: string
  errorText?: string
  options: SelectOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  onValueChange?: (value: string) => void
}

function SelectChoices({ options }: { options: SelectOption[] }) {
  return options.map((option) => (
    <RadixSelect.Item
      key={option.value}
      value={option.value}
      className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 font-ui text-ui text-text [--focus-ring-offset:var(--focus-ring-inset-offset)] data-[highlighted]:bg-surface-subtle data-[disabled]:opacity-(--opacity-disabled)"
    >
      <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator>
        <Icon name="done" size="small" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  ))
}

// A styled select. Radix handles the keyboard (arrows, type to jump, Escape) and focus.
export function Select({
  label,
  isLabelHidden,
  hint,
  errorText,
  options,
  value,
  defaultValue,
  placeholder = defaultPlaceholder,
  disabled,
  onValueChange,
}: SelectProps) {
  const triggerId = useId()

  return (
    <Field
      controlId={triggerId}
      label={label}
      isLabelHidden={isLabelHidden}
      hint={hint}
      errorText={errorText}
    >
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          id={triggerId}
          aria-invalid={errorText ? true : undefined}
          aria-describedby={getDescribedBy(triggerId, hint, errorText)}
          className={clsx(
            'inline-flex h-(--control-field) w-full items-center justify-between gap-2 rounded border bg-page px-3',
            'font-ui text-input text-text data-[placeholder]:text-text-muted',
            'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
            errorText ? 'border-danger' : 'border-text-muted',
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <Icon name="expand" size="small" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={popupGapInPixels}
            className={`${popupSurfaceClass} max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-y-auto`}
          >
            <RadixSelect.Viewport>
              <SelectChoices options={options} />
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </Field>
  )
}
