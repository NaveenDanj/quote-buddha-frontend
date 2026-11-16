import { useId, type ReactNode } from 'react'
import { Text } from '@ds/atoms/Text'

type HeadingElement = 'h2' | 'h3' | 'h4'

type SystemExplanationProps = {
  heading: string
  headingElement?: HeadingElement
  label: string
  children: ReactNode
}

export function SystemExplanation({
  heading,
  headingElement = 'h3',
  label,
  children,
}: SystemExplanationProps) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="grid gap-2 rounded bg-surface-subtle px-5 py-4 forced-colors:border"
    >
      <Text variant="label" as={headingElement} id={headingId}>
        {heading}
      </Text>
      <div className="font-reading text-reading text-text">{children}</div>
      <p className="m-0 font-ui text-caption text-text-muted">{label}</p>
    </section>
  )
}
