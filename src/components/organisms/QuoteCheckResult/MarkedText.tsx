import { Mark } from '@ds/atoms/Mark'
import { Text } from '@ds/atoms/Text'
import type { TextPart } from '@domain'

type MarkedTextProps = {
  parts: TextPart[]
}

export function MarkedText({ parts }: MarkedTextProps) {
  return (
    <Text variant="reading" as="p">
      {parts.map((part, index) =>
        part.isDifferent ? (
          <Mark key={index}>{part.text}</Mark>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </Text>
  )
}
