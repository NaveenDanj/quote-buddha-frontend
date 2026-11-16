import { describe, expect, it } from 'vitest'
import { readServerSentEvents, type ServerSentEvent } from './readServerSentEvents'

function makeStream(chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk))
      }
      controller.close()
    },
  })
}

async function readAll(chunks: string[]): Promise<ServerSentEvent[]> {
  const events: ServerSentEvent[] = []
  for await (const serverEvent of readServerSentEvents(makeStream(chunks))) {
    events.push(serverEvent)
  }
  return events
}

describe('readServerSentEvents', () => {
  it('reads named events with data', async () => {
    const events = await readAll(['event: step\ndata: {"a":1}\n\nevent: answer\ndata: {"b":2}\n\n'])
    expect(events).toEqual([
      { event: 'step', data: '{"a":1}' },
      { event: 'answer', data: '{"b":2}' },
    ])
  })

  it('puts together an event that arrives in pieces', async () => {
    const events = await readAll(['event: st', 'ep\ndata: {"a"', ':1}\n', '\n'])
    expect(events).toEqual([{ event: 'step', data: '{"a":1}' }])
  })

  it('treats an event with no name as "message"', async () => {
    expect(await readAll(['data: hello\n\n'])).toEqual([{ event: 'message', data: 'hello' }])
  })

  it('joins several data lines with a new line', async () => {
    expect(await readAll(['data: one\ndata: two\n\n'])).toEqual([
      { event: 'message', data: 'one\ntwo' },
    ])
  })

  it('understands Windows line endings, even when the break is split between chunks', async () => {
    const events = await readAll(['event: step\r\ndata: x\r', '\n\r\n'])
    expect(events).toEqual([{ event: 'step', data: 'x' }])
  })

  it('ignores comments and blocks with no data', async () => {
    expect(await readAll([': keep alive\n\nevent: step\n\ndata: kept\n\n'])).toEqual([
      { event: 'message', data: 'kept' },
    ])
  })

  it('reads a last event that has no closing blank line', async () => {
    expect(await readAll(['event: answer\ndata: end'])).toEqual([{ event: 'answer', data: 'end' }])
  })
})
