import {
  AskErrorCode,
  AskEventName,
  createAskError,
  parseAskEvent,
  type AskEvent,
} from './askEvents'
import type { AskRequest } from './askRequest'
import { readServerSentEvents } from './readServerSentEvents'

const askPath = '/api/v1/ask'

function getAskUrl(): string {
  const baseUrl = import.meta.env['VITE_API_URL'] ?? window.location.origin
  return new URL(askPath, baseUrl).toString()
}

function createErrorEvent(code: string): AskEvent {
  return { kind: AskEventName.error, error: createAskError(code) }
}

export async function askQuestion(
  request: AskRequest,
  onEvent: (event: AskEvent) => void,
  signal: AbortSignal,
): Promise<void> {
  const response = await fetch(getAskUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify(request),
    signal,
  })

  if (!response.ok) {
    onEvent(createErrorEvent(`${AskErrorCode.requestFailed}_${response.status}`))
    return
  }
  if (!response.body) {
    onEvent(createErrorEvent(AskErrorCode.noStream))
    return
  }

  for await (const serverEvent of readServerSentEvents(response.body)) {
    const event = parseAskEvent(serverEvent)
    if (event) {
      onEvent(event)
    }
  }
}
