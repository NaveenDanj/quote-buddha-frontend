import { Button } from '@ds/atoms/Button'
import { FactList, type Fact } from '@ds/atoms/FactList'
import { Surface, SurfaceLook, SurfaceSpace } from '@ds/atoms/Surface'
import { Text } from '@ds/atoms/Text'
import { EvidenceState, TextLanguage, getCitationLabel, type AnswerSource } from '@domain'
import { matchedByText, wording } from '@wording'
import { EvidenceTag } from '@components/molecules/EvidenceTag'

const percentScale = 100
const locationSeparator = ' › '

type SourceDetailsProps = {
  source: AnswerSource
  onOpenInReader?: (citationId: string) => void
}

function getFacts(source: AnswerSource): Fact[] {
  const { location } = source
  const place = [location.collection, location.nikaya, location.work, location.section]
    .filter(Boolean)
    .join(locationSeparator)
  const similarity = `${Math.round(source.similarity * percentScale)}%`

  return [
    { label: wording.editionLabel, value: source.edition },
    { label: wording.translatorLabel, value: source.translator ?? wording.notRecordedInSource },
    {
      label: wording.checksumLabel,
      value: <span className="font-code text-code">{source.checksum}</span>,
    },
    { label: wording.locationLabel, value: place },
    { label: wording.matchLabel, value: `${matchedByText[source.matchedBy]} · ${similarity}` },
  ]
}

type PassageRowProps = {
  label: string
  text: string
  language: TextLanguage
}

function PassageRow({ label, text, language }: PassageRowProps) {
  const isPali = language === TextLanguage.pali

  return (
    <div className="grid gap-1">
      <Text variant="caption" className="text-text-muted">
        {label}
      </Text>
      <Text variant={isPali ? 'pali' : 'reading'} as="p" lang={language} className="text-text">
        {text}
      </Text>
    </div>
  )
}

// The stored passage, where it comes from, and what is not known about it. Gaps are written out.
export function SourceDetails({ source, onOpenInReader }: SourceDetailsProps) {
  return (
    <Surface look={SurfaceLook.framed} padding={SurfaceSpace.medium} gap={SurfaceSpace.medium}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Text variant="heading3" as="h3">
          {getCitationLabel(source)}
        </Text>
        {source.used ? null : <EvidenceTag state={EvidenceState.notUsed} />}
      </div>
      <PassageRow label={wording.paliLabel} text={source.paliText} language={TextLanguage.pali} />
      <PassageRow
        label={wording.sinhalaLabel}
        text={source.sinhalaText}
        language={TextLanguage.sinhala}
      />
      <FactList facts={getFacts(source)} />
      <Text variant="caption" as="p" className="text-text-muted">
        {wording.parallelsNotChecked}
      </Text>
      {onOpenInReader ? (
        <div>
          <Button variant="text" onClick={() => onOpenInReader(source.citationId)}>
            {wording.openInReaderLabel}
          </Button>
        </div>
      ) : null}
    </Surface>
  )
}
