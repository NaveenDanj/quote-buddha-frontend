import { useId, type ReactNode } from 'react'
import { Text } from '@ds/atoms/Text'
import { EvidenceState } from '@domain'
import { wording } from '@wording'
import { EvidenceTag } from '@components/molecules/EvidenceTag'

type NoticeState = Exclude<EvidenceState, 'directQuote' | 'notVerified'>

type HeadingElement = 'h2' | 'h3' | 'h4'

type NoticeProps = {
  state?: NoticeState
  title: string
  headingElement?: HeadingElement
  children?: ReactNode
}

// A finding that is not an error: dashed outline, calm words, never red, never an apology.
export function Notice({
  state = EvidenceState.notEstablished,
  title,
  headingElement = 'h3',
  children,
}: NoticeProps) {
  const titleId = useId()
  const isAbstention = state === EvidenceState.notEstablished

  return (
    <section
      aria-labelledby={titleId}
      className="grid gap-3 rounded border border-dashed border-text-muted p-5"
    >
      <EvidenceTag state={state} />
      <Text variant="heading3" as={headingElement} id={titleId}>
        {title}
      </Text>
      {isAbstention ? (
        <p className="m-0 max-w-(--measure-reading) font-ui text-caption text-text-muted">
          {wording.abstentionScope}
        </p>
      ) : null}
      {children}
    </section>
  )
}
