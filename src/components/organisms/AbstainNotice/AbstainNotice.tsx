import { Disclosure } from '@ds/atoms/Disclosure'
import { FactList, type Fact } from '@ds/atoms/FactList'
import { Text } from '@ds/atoms/Text'
import type { Answer } from '@domain'
import { abstentionReasonText, wording } from '@wording'
import { Notice } from '@components/molecules/Notice'

type AbstainNoticeProps = {
  answer: Answer
}

function getSearchFacts(answer: Answer): Fact[] {
  const facts: Fact[] = [
    { label: wording.corpusVersionLabel, value: answer.corpusVersion },
    { label: wording.passagesRetrievedLabel, value: answer.retrievedCount },
  ]
  if (answer.abstentionReason) {
    facts.push({ label: wording.whyNotLabel, value: abstentionReasonText[answer.abstentionReason] })
  }
  return facts
}

// The system found nothing to stand behind. That is a finding, so it is calm and never red.
export function AbstainNotice({ answer }: AbstainNoticeProps) {
  return (
    <Notice title={wording.abstentionText}>
      <Text variant="caption" as="p" className="max-w-(--measure-reading) text-text-muted">
        {wording.partialCorpusNote}
      </Text>
      <Disclosure summary={wording.whatWeSearchedLabel}>
        <FactList facts={getSearchFacts(answer)} />
      </Disclosure>
    </Notice>
  )
}
