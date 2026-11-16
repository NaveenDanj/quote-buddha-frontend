import { useId, type ReactNode } from 'react'
import { Surface, SurfaceLook, SurfaceSpace } from '@ds/atoms/Surface'
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

export function Notice({
  state = EvidenceState.notEstablished,
  title,
  headingElement = 'h3',
  children,
}: NoticeProps) {
  const titleId = useId()
  const isAbstention = state === EvidenceState.notEstablished

  return (
    <Surface
      as="section"
      look={SurfaceLook.dashed}
      padding={SurfaceSpace.large}
      gap={SurfaceSpace.medium}
      aria-labelledby={titleId}
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
    </Surface>
  )
}
