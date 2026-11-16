import { describe, expect, it } from 'vitest'
import { wording } from '@wording'
import { AskErrorCode, AskEventName, parseAskEvent } from './askEvents'

describe('parseAskEvent', () => {
  it('reads a step event', () => {
    const step = { kind: 'searching', text: 'Searching' }
    expect(parseAskEvent({ event: AskEventName.step, data: JSON.stringify(step) })).toEqual({
      kind: AskEventName.step,
      step,
    })
  })

  it('reads an error event from the backend', () => {
    const error = { code: 'sample', message: 'Sample message' }
    expect(parseAskEvent({ event: AskEventName.error, data: JSON.stringify(error) })).toEqual({
      kind: AskEventName.error,
      error,
    })
  })

  it('ignores events it does not know, so the backend can add new ones', () => {
    expect(parseAskEvent({ event: 'heartbeat', data: '{}' })).toBeNull()
  })

  it('turns data that is not valid JSON into a calm error', () => {
    const parsed = parseAskEvent({ event: AskEventName.answer, data: 'not json' })
    expect(parsed).toEqual({
      kind: AskEventName.error,
      error: { code: AskErrorCode.badEvent, message: wording.askFailedText },
    })
  })
})
