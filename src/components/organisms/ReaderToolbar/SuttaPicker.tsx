import { Chip } from '@ds/atoms/Chip'
import { Icon } from '@ds/atoms/Icon'
import { Menu, type MenuItem } from '@ds/atoms/Menu'
import { getSuttaLabel, type Sutta } from '@domain'
import { wording } from '@wording'

type SuttaPickerProps = {
  suttas: Sutta[]
  currentSutta: Sutta
  onChooseSutta: (suttaId: string) => void
}

function toMenuItem(sutta: Sutta, onChooseSutta: (suttaId: string) => void): MenuItem {
  return {
    label: getSuttaLabel(sutta),
    unavailableReason: sutta.isIncluded ? undefined : wording.notYetIncluded,
    onSelect: () => onChooseSutta(sutta.id),
  }
}

export function SuttaPicker({ suttas, currentSutta, onChooseSutta }: SuttaPickerProps) {
  const items = suttas.map((sutta) => toMenuItem(sutta, onChooseSutta))

  return (
    <Menu
      items={items}
      trigger={
        <Chip icon="reader" aria-label={wording.chooseTextLabel} className="border-text text-text">
          {getSuttaLabel(currentSutta)}
          <Icon name="expand" size="small" />
        </Chip>
      }
    />
  )
}
