import type { FormEvent } from 'react'
import { IconButton, IconButtonLook } from '@ds/atoms/IconButton'
import { Input } from '@ds/atoms/Input'
import { wording } from '@wording'
import { PassageContext } from '@components/molecules/PassageContext'

type AskBarProps = {
  contextLabel: string
  value: string
  onValueChange: (value: string) => void
  onSubmit: () => void
}

// The one-line question box under the Reader. The label says which passage the question is about.
export function AskBar({ contextLabel, value, onValueChange, onSubmit }: AskBarProps) {
  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form
      autoComplete="off"
      onSubmit={submitQuestion}
      className="flex items-center gap-group border-t border-border bg-page px-(--gutter) py-card-tight"
    >
      <PassageContext label={contextLabel} />
      <div className="min-w-0 flex-1">
        <Input
          label={wording.askBarLabel}
          isLabelHidden
          placeholder={wording.askBarPlaceholder}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
        />
      </div>
      <IconButton
        icon="send"
        type="submit"
        look={IconButtonLook.solid}
        label={wording.askLabel}
        disabled={value.trim().length === 0}
      />
    </form>
  )
}
