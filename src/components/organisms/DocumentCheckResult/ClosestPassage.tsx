import { Text } from '@ds/atoms/Text'
import type { DocumentSaying } from '@domain'
import { wording } from '@wording'
import { CiteLink } from '@components/molecules/CiteLink'

type ClosestPassageProps = {
  saying: DocumentSaying
  onOpenPassage: (citationId: string) => void
}

export function ClosestPassage({ saying, onOpenPassage }: ClosestPassageProps) {
  if (saying.closestCitationId && saying.closestCitationLabel) {
    return (
      <CiteLink
        citationId={saying.closestCitationId}
        label={saying.closestCitationLabel}
        onOpen={onOpenPassage}
      />
    )
  }
  return (
    <Text variant="ui" isMuted>
      {wording.noClosestPassageText}
    </Text>
  )
}
