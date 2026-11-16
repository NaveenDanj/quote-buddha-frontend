import { useId, type ReactNode } from 'react'
import { Button } from '@ds/atoms/Button'
import { Tag, TagGlyph } from '@ds/atoms/Tag'
import { wording } from '@wording'

type SuggestionBlockProps = {
  onUse: () => void
  onDiscard: () => void
  children: ReactNode
}

// Text the system wrote for the person to accept or throw away. Never styled like a quotation.
export function SuggestionBlock({ onUse, onDiscard, children }: SuggestionBlockProps) {
  const tagId = useId()

  return (
    <div
      role="group"
      aria-labelledby={tagId}
      className="grid gap-2 rounded border border-dashed border-text-muted px-4 py-3"
    >
      <span id={tagId}>
        <Tag glyph={TagGlyph.hatched}>{wording.suggestionLabel}</Tag>
      </span>
      <div className="font-reading text-ui text-text">{children}</div>
      <p className="m-0 font-ui text-stamp text-text-muted">{wording.systemLabel}</p>
      <div className="flex flex-wrap gap-2">
        <Button size="small" onClick={onUse}>
          {wording.useSuggestionLabel}
        </Button>
        <Button size="small" variant="secondary" onClick={onDiscard}>
          {wording.discardSuggestionLabel}
        </Button>
      </div>
    </div>
  )
}
