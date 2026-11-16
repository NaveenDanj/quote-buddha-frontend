import { Chip } from '@ds/atoms/Chip'
import { TextLanguage } from '@domain'

type GlossChipProps = {
  pali: string
  gloss: string
  onOpen: (pali: string) => void
}

export function GlossChip({ pali, gloss, onOpen }: GlossChipProps) {
  return (
    <Chip onClick={() => onOpen(pali)}>
      <span lang={TextLanguage.pali}>{pali}</span> <span className="font-normal">{gloss}</span>
    </Chip>
  )
}
