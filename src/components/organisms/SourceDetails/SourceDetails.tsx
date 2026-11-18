import { Breadcrumbs, type Crumb } from '@ds/atoms/Breadcrumbs'
import { Button } from '@ds/atoms/Button'
import { FactList, type Fact } from '@ds/atoms/FactList'
import { Surface, SurfaceSpace } from '@ds/atoms/Surface'
import { Text } from '@ds/atoms/Text'
import { TextLanguage, type AnswerSource } from '@domain'
import { wording } from '@wording'

type SourceDetailsProps = {
  source: AnswerSource
  onOpenInReader?: (citationId: string) => void
  onCompare?: (citationId: string) => void
  onSave?: (citationId: string) => void
}

function getCrumbs(source: AnswerSource): Crumb[] {
  const { collection, nikaya, work } = source.location
  return [{ label: collection }, { label: nikaya }, { label: work }]
}

function getFacts(source: AnswerSource): Fact[] {
  return [
    { label: wording.sourceLabel, value: source.edition },
    { label: wording.translatorLabel, value: source.translator ?? wording.notRecordedInSource },
    {
      label: wording.checksumLabel,
      value: <span className="font-code text-stamp text-text-muted">{source.checksum}</span>,
    },
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
    <div className="grid gap-related">
      <Text variant="label" as="span">
        {label}
      </Text>
      <Text variant={isPali ? 'readingLarge' : 'reading'} as="p" lang={language}>
        {text}
      </Text>
    </div>
  )
}

type SourceActionsProps = Omit<SourceDetailsProps, 'source'> & { citationId: string }

function SourceActions({ citationId, onOpenInReader, onCompare, onSave }: SourceActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-page gap-y-group">
      {onOpenInReader ? (
        <Button variant="secondary" size="small" onClick={() => onOpenInReader(citationId)}>
          {wording.openInReaderLabel}
        </Button>
      ) : null}
      {onCompare ? (
        <Button variant="text" size="small" onClick={() => onCompare(citationId)}>
          {wording.compareLabel}
        </Button>
      ) : null}
      {onSave ? (
        <Button variant="text" size="small" onClick={() => onSave(citationId)}>
          {wording.saveLabel}
        </Button>
      ) : null}
    </div>
  )
}

// What is known about one passage: where it sits, its words, and where they come from. Gaps are written out.
export function SourceDetails({ source, onOpenInReader, onCompare, onSave }: SourceDetailsProps) {
  return (
    <Surface gap={SurfaceSpace.medium}>
      <Breadcrumbs label={wording.locationInCanonLabel} crumbs={getCrumbs(source)} />
      <PassageRow label={wording.paliLabel} text={source.paliText} language={TextLanguage.pali} />
      <PassageRow
        label={wording.sinhalaLabel}
        text={source.sinhalaText}
        language={TextLanguage.sinhala}
      />
      <FactList facts={getFacts(source)} />
      <SourceActions
        citationId={source.citationId}
        onOpenInReader={onOpenInReader}
        onCompare={onCompare}
        onSave={onSave}
      />
    </Surface>
  )
}
