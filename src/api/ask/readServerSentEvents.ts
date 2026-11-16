export type ServerSentEvent = {
  event: string
  data: string
}

const defaultEventName = 'message'

function parseBlock(block: string): ServerSentEvent | null {
  let eventName = defaultEventName
  const dataLines: string[] = []

  for (const line of block.split('\n')) {
    if (line.startsWith('event:')) {
      eventName = line.slice('event:'.length).trim()
    } else if (line.startsWith('data:')) {
      dataLines.push(line.slice('data:'.length).trimStart())
    }
  }

  if (dataLines.length === 0) {
    return null
  }
  return { event: eventName, data: dataLines.join('\n') }
}

// Reads a text/event-stream body. A chunk can end in the middle of an event, so text is kept
// until a blank line says the event is complete.
export async function* readServerSentEvents(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<ServerSentEvent> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let waitingText = ''
  let isFinished = false

  while (!isFinished) {
    const { done, value } = await reader.read()
    isFinished = done
    waitingText += value ? decoder.decode(value, { stream: true }) : ''
    waitingText = waitingText.replace(/\r\n/g, '\n')

    const blocks = waitingText.split('\n\n')
    waitingText = isFinished ? '' : (blocks.pop() ?? '')

    for (const block of blocks) {
      const serverEvent = parseBlock(block)
      if (serverEvent) {
        yield serverEvent
      }
    }
  }
}
