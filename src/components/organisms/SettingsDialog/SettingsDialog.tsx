import type { ReactNode } from 'react'
import { Chip } from '@ds/atoms/Chip'
import { Dialog } from '@ds/atoms/Dialog'
import { SegmentedControl, type SegmentOption } from '@ds/atoms/SegmentedControl'
import { Surface, SurfaceSpace } from '@ds/atoms/Surface'
import { Text } from '@ds/atoms/Text'
import { ReadingSize, toReadingSize } from '@ds/tokens/readingSize'
import { toThemeChoice, type ThemeChoice } from '@ds/tokens/theme'
import { wording } from '@wording'

type SettingsDialogProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  theme: ThemeChoice
  onThemeChange: (theme: ThemeChoice) => void
  readingSize: ReadingSize
  onReadingSizeChange: (size: ReadingSize) => void
}

const readingSizeOptions: SegmentOption[] = [
  { value: ReadingSize.small, label: wording.sizeSmallLabel },
  { value: ReadingSize.medium, label: wording.sizeMediumLabel },
  { value: ReadingSize.large, label: wording.sizeLargeLabel },
]

const themeOptions: SegmentOption[] = [
  { value: 'system', label: wording.themeSystemLabel },
  { value: 'light', label: wording.themeLightLabel },
  { value: 'dark', label: wording.themeDarkLabel },
]

type SettingProps = {
  label: string
  children: ReactNode
}

// The name is shown above the choices. The group inside carries it for screen readers.
function Setting({ label, children }: SettingProps) {
  return (
    <div className="grid gap-group">
      <Text variant="label" as="span" aria-hidden="true">
        {label}
      </Text>
      {children}
    </div>
  )
}

// Other languages are planned, so they are shown, but they cannot be chosen yet.
function LanguageChoices() {
  return (
    <div role="group" aria-label={wording.languageLabel} className="flex flex-wrap gap-group">
      <Chip isPressed>{wording.englishLabel}</Chip>
      <Chip unavailableReason={wording.soonText}>{wording.sinhalaNativeLabel}</Chip>
      <Chip unavailableReason={wording.soonText}>{wording.paliLabel}</Chip>
    </div>
  )
}

export function SettingsDialog({
  isOpen,
  onOpenChange,
  theme,
  onThemeChange,
  readingSize,
  onReadingSizeChange,
}: SettingsDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={wording.settingsLabel}
      closeLabel={wording.closeSettingsLabel}
    >
      <Surface gap={SurfaceSpace.large}>
        <Setting label={wording.readingSizeLabel}>
          <SegmentedControl
            label={wording.readingSizeLabel}
            options={readingSizeOptions}
            value={readingSize}
            onValueChange={(value) => onReadingSizeChange(toReadingSize(value))}
          />
        </Setting>
        <Setting label={wording.themeLabel}>
          <SegmentedControl
            label={wording.themeLabel}
            options={themeOptions}
            value={theme}
            onValueChange={(value) => onThemeChange(toThemeChoice(value))}
          />
        </Setting>
        <Setting label={wording.languageLabel}>
          <LanguageChoices />
        </Setting>
        <Text variant="caption" as="p" isMuted>
          {wording.settingsNote}
        </Text>
      </Surface>
    </Dialog>
  )
}
