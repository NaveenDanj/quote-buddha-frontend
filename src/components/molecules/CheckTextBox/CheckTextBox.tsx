import { Button } from '@ds/atoms/Button'
import { Surface, SurfaceLook } from '@ds/atoms/Surface'
import { Text } from '@ds/atoms/Text'
import { Textarea, TextareaLook } from '@ds/atoms/Textarea'
import { wording } from '@wording'

type CheckTextBoxProps = {
  label: string
  placeholder: string
  value: string
  onValueChange: (value: string) => void
  rowCount: number
  scopeText: string
  buttonLabel: string
  canCheck: boolean
  isChecking: boolean
  onCheck: () => void
}

export function CheckTextBox({
  label,
  placeholder,
  value,
  onValueChange,
  rowCount,
  scopeText,
  buttonLabel,
  canCheck,
  isChecking,
  onCheck,
}: CheckTextBoxProps) {
  return (
    <Surface look={SurfaceLook.outlined} className="relative focus-within:border-accent">
      <Textarea
        look={TextareaLook.bare}
        label={label}
        isLabelHidden
        value={value}
        rows={rowCount}
        placeholder={placeholder}
        onChange={(event) => onValueChange(event.target.value)}
        className="min-h-(--composer-text-min-height)"
      />
      <div className="flex flex-wrap items-center justify-between gap-group pt-group pr-card-tight pb-card-tight pl-card">
        <Text variant="caption" isMuted>
          {scopeText}
        </Text>
        <Button size="small" disabled={!canCheck || isChecking} onClick={onCheck}>
          {isChecking ? wording.checkingQuotesLabel : buttonLabel}
        </Button>
      </div>
    </Surface>
  )
}
