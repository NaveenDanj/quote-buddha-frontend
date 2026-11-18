import { useId, type ReactNode } from 'react'
import { Surface, SurfaceLook, SurfaceSpace } from '@ds/atoms/Surface'
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
    <Surface
      as="section"
      look={SurfaceLook.subtle}
      padding={SurfaceSpace.large}
      gap={SurfaceSpace.small}
      aria-labelledby={headingId}
    >
      <Text variant="label" as={headingElement} id={headingId}>
        {heading}
      </Text>
      <Text variant="reading" as="div" className="text-text">
        {children}
      </Text>
      <Text variant="caption" as="p" isMuted>
        {label}
      </Text>
    </Surface>
  )
}
