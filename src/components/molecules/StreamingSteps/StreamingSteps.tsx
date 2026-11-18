import { LiveDot } from '@ds/atoms/LiveDot'
import { Text } from '@ds/atoms/Text'
import type { StreamStep } from '@domain'
import { wording } from '@wording'

type StreamingStepsProps = {
  steps: StreamStep[]
  isStreaming: boolean
}

// This list is the picture of progress. The message above it holds the one status region that announces it.
export function StreamingSteps({ steps, isStreaming }: StreamingStepsProps) {
  const lastPosition = steps.length - 1

  return (
    <Text
      as="ol"
      variant="caption"
      isMuted
      aria-label={wording.stepsLabel}
      className="grid list-none gap-group"
    >
      {steps.map((step, position) => (
        <li key={`${step.kind}-${position}`} className="flex gap-block">
          <Text variant="codeSmall" className="w-6 flex-none">
            {position + 1}
          </Text>
          <span>
            {step.text}
            {step.count !== undefined ? (
              <Text variant="codeSmall">{` · ${step.count}`}</Text>
            ) : null}
            {isStreaming && position === lastPosition ? (
              <span className="ml-group">
                <LiveDot />
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </Text>
  )
}
