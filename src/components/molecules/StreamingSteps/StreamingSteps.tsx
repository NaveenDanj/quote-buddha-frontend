import { LiveDot } from '@ds/atoms/LiveDot'
import type { StreamStep } from '@domain'
import { wording } from '@wording'

type StreamingStepsProps = {
  steps: StreamStep[]
  isStreaming: boolean
}

export function StreamingSteps({ steps, isStreaming }: StreamingStepsProps) {
  const lastPosition = steps.length - 1

  return (
    <ol
      aria-label={wording.stepsLabel}
      aria-live="polite"
      className="m-0 grid list-none gap-2 p-0 font-ui text-caption text-text-muted"
    >
      {steps.map((step, position) => (
        <li key={`${step.kind}-${position}`} className="flex gap-3">
          <span className="w-6 flex-none font-code text-stamp">{position + 1}</span>
          <span>
            {step.text}
            {step.count !== undefined ? (
              <span className="font-code text-stamp">{` · ${step.count}`}</span>
            ) : null}
            {isStreaming && position === lastPosition ? (
              <span className="ml-2">
                <LiveDot />
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  )
}
