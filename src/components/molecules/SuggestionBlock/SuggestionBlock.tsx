import { useId, type ReactNode } from 'react'
import { Button } from '@ds/atoms/Button'
import { Surface, SurfaceLook, SurfaceSpace } from '@ds/atoms/Surface'
import { Tag, TagGlyph } from '@ds/atoms/Tag'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'

type SuggestionBlockProps = {
  onUse: () => void
  onDiscard: () => void
  children: ReactNode
}

export function SuggestionBlock({ onUse, onDiscard, children }: SuggestionBlockProps) {
  const tagId = useId()

  return (
    <Surface
      look={SurfaceLook.dashed}
      padding={SurfaceSpace.medium}
      gap={SurfaceSpace.small}
      role="group"
      aria-labelledby={tagId}
    >
      <span id={tagId}>
        <Tag glyph={TagGlyph.hatched}>{wording.suggestionLabel}</Tag>
      </span>
      <Text variant="readingCompact" as="div" className="text-text">
        {children}
      </Text>
      <Text variant="small" as="p" isMuted>
        {wording.systemLabel}
      </Text>
      <div className="flex flex-wrap gap-group">
        <Button size="small" onClick={onUse}>
          {wording.useSuggestionLabel}
        </Button>
        <Button size="small" variant="secondary" onClick={onDiscard}>
          {wording.discardSuggestionLabel}
        </Button>
      </div>
    </Surface>
  )
}
