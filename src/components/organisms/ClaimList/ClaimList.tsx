import {
  EvidenceState,
  findSource,
  getCitationLabel,
  getEvidenceStateFromLabel,
  getSourceNumber,
  toTextLanguage,
  type AnswerSource,
  type VerifiedClaim,
} from '@domain'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { CiteLink } from '@components/molecules/CiteLink'
import { EvidenceTag } from '@components/molecules/EvidenceTag'
import { FootnoteMarker } from '@components/molecules/FootnoteMarker'
import { PassageQuote } from '@components/molecules/PassageQuote'

type ClaimListProps = {
  claims: VerifiedClaim[]
  sources: AnswerSource[]
  onOpenSource: (citationId: string) => void
}

type ClaimRowProps = {
  claim: VerifiedClaim
  sources: AnswerSource[]
  onOpenSource: (citationId: string) => void
}

function ClaimRow({ claim, sources, onOpenSource }: ClaimRowProps) {
  const state = getEvidenceStateFromLabel(claim.evidenceLabel)
  const source = findSource(sources, claim.quoteCitationId)
  const sourceNumber = getSourceNumber(sources, claim.quoteCitationId)

  const citation = (
    <>
      {source ? (
        <CiteLink
          citationId={claim.quoteCitationId}
          label={getCitationLabel(source)}
          onOpen={onOpenSource}
        />
      ) : (
        <Text variant="caption" className="text-text-muted">
          {wording.sourceUnavailableText}
        </Text>
      )}
      <EvidenceTag state={state} />
    </>
  )

  return (
    <>
      <Text variant="reading" as="p" className="text-text">
        {claim.text}
        {sourceNumber === undefined ? null : (
          <FootnoteMarker
            number={sourceNumber}
            onOpen={() => onOpenSource(claim.quoteCitationId)}
          />
        )}
      </Text>
      {state === EvidenceState.directQuote ? (
        <PassageQuote
          quote={claim.quote}
          language={toTextLanguage(claim.quoteEditionLanguage)}
          source={citation}
        />
      ) : (
        <div className="flex flex-wrap items-center gap-4">{citation}</div>
      )}
    </>
  )
}

// Only a verified direct quote is shown as a quotation. A claim whose quote was not checked shows
// its citation and "Not verified", and never its quote text.
export function ClaimList({ claims, sources, onOpenSource }: ClaimListProps) {
  return (
    <ol className="m-0 grid list-none gap-5 p-0">
      {claims.map((claim, position) => (
        // The same passage can back several claims, so the position keeps each key unique.
        <li
          key={`${claim.quoteCitationId}-${position}`}
          className="grid gap-3 border-t border-border pt-4"
        >
          <ClaimRow claim={claim} sources={sources} onOpenSource={onOpenSource} />
        </li>
      ))}
    </ol>
  )
}
