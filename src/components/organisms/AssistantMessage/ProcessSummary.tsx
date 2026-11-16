import { Disclosure } from '@ds/atoms/Disclosure'
import { countDirectQuotes, type Answer, type StreamStep } from '@domain'
import { processSummaryText } from '@wording'
import { StreamingSteps } from '@components/molecules/StreamingSteps'

type ProcessSummaryProps = {
  answer: Answer
  steps: StreamStep[]
}

function getWorkNames(answer: Answer): string[] {
  const works = answer.sources.map((source) => source.workRef)
  return [...new Set(works)]
}

export function ProcessSummary({ answer, steps }: ProcessSummaryProps) {
  const verifiedCount = countDirectQuotes(answer.claims)

  const summary = processSummaryText({
    works: getWorkNames(answer),
    retrievedCount: answer.retrievedCount,
    verifiedCount,
    notVerifiedCount: answer.claims.length - verifiedCount,
    removedCount: answer.droppedClaimCount,
  })

  return (
    <Disclosure summary={summary}>
      <StreamingSteps steps={steps} isStreaming={false} />
    </Disclosure>
  )
}
