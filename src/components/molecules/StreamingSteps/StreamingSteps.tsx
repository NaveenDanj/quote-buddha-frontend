import { LiveDot } from '@ds/atoms/LiveDot'
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
    <ol
      aria-label={wording.stepsLabel}
      className="grid list-none gap-group font-ui text-caption text-text-muted"
    >
      {steps.map((step, position) => (
        <li key={`${step.kind}-${position}`} className="flex gap-block">
          <span className="w-6 flex-none font-code text-stamp">{position + 1}</span>
          <span>
            {step.text}
            {step.count !== undefined ? (
              <span className="font-code text-stamp">{` · ${step.count}`}</span>
            ) : null}
            {isStreaming && position === lastPosition ? (
              <span className="ml-group">
                <LiveDot />
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  )
}
