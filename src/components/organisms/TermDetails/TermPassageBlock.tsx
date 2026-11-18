import { Button } from '@ds/atoms/Button'
import { Text } from '@ds/atoms/Text'
import { TextLanguage, type TermPassage } from '@domain'
import { wording } from '@wording'
import { CiteLink } from '@components/molecules/CiteLink'
import { PassageQuote } from '@components/molecules/PassageQuote'

type TermPassageBlockProps = {
  passage: TermPassage
  onOpenPassage: (citationId: string) => void
  onOpenReader: (citationId: string) => void
  onAskAboutTerm: () => void
}

// A passage where the term appears, with a way to read more or to ask about the term.
export function TermPassageBlock({
  passage,
  onOpenPassage,
  onOpenReader,
  onAskAboutTerm,
}: TermPassageBlockProps) {
  return (
    <div className="grid gap-group">
      <Text variant="label" as="h3">
        {wording.termInContextHeading}
      </Text>
      <PassageQuote
        quote={passage.text}
        language={TextLanguage.pali}
        source={
          <>
            <CiteLink
              citationId={passage.citationId}
              label={passage.label}
              onOpen={onOpenPassage}
            />
            <Button variant="text" size="small" onClick={() => onOpenReader(passage.citationId)}>
              {wording.openInReaderLabel}
            </Button>
            <Button variant="text" size="small" onClick={onAskAboutTerm}>
              {wording.askAboutTermLabel}
            </Button>
          </>
        }
      />
    </div>
  )
}
