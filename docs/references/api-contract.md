# API contract (frontend view)

Backend: `../quote-buddha`. At the time of writing, only `GET /api/v1/health` exists. The answering logic exists as a service and a CLI (`quote-buddha-ask`); `/ask` and `/verify-quote` are planned (`../quote-buddha/docs/references/architecture.md`). Until endpoints land, the frontend runs on MSW fixtures that follow this document. Skill: `api-contract-mirroring`.

Fields marked **NEEDS BACKEND** do not exist yet in the backend model. Send them as a request to `../quote-buddha/docs/plans/` (a plan `05-api-endpoints.md`).

## Existing backend model (`answering/models/answer.py`)
```ts
type AnswerStatus = 'ANSWERED' | 'ABSTAINED'
type EvidenceLabel = 'DIRECT' | 'UNVERIFIED'
type AbstentionReason = 'WEAK_EVIDENCE' | 'NOT_ENOUGH_VERIFIED_CLAIMS'

interface AnswerSource {
  citationId: string        // e.g. 'pitaka_lk:dn-1:44:5'
  workRef: string           // e.g. 'DN 1'
  workTitle: string
  sinhalaText: string
  paliText: string
}

interface VerifiedClaim {
  text: string
  citationIds: string[]
  quote: string
  quoteCitationId: string
  quoteEditionLanguage: string
  evidenceLabel: EvidenceLabel
}

interface Answer {
  question: string
  status: AnswerStatus
  simpleAnswer: string | null
  claims: VerifiedClaim[]
  sources: AnswerSource[]
  abstentionReason: AbstentionReason | null
  foundInIncludedTexts: boolean   // true when ANSWERED
  // dropped claims are debug only; the UI does not show them as answers
}
```

## Needed for the approved UI (**NEEDS BACKEND**)
### `POST /api/v1/ask` (server-sent events)
Request: `{ question, depth: 'quick' | 'deep', scope: 'early_texts', chatId?, context?: { citationId, selectedText? }, readerLevel?: 'general' | 'researcher', language?: 'en' }`.
Events:
- `step`: `{ kind: 'searching' | 'retrieved' | 'drafting' | 'verifying' | 'planning' | 'compiling', text, count? }`
- `answer`: the `Answer` above plus the additions below.
- `error`: `{ code, message }` (calm text, no stack).

Additions to `Answer` and `AnswerSource`:
```ts
interface AnswerSource {          // add
  matchedBy: 'WORDS' | 'SIMILAR_TEXT'
  similarity: number              // 0..1
  used: boolean                   // retrieved but not used => false
  edition: string                 // 'Pali with Sinhala translation, pitaka.lk'
  translator: string | null       // null => UI says "Not recorded in source"
  checksum: string
  location: { collection: string; nikaya: string; work: string; section?: string }
}
interface Answer {                // add
  corpusVersion: string           // 'v0.1'
  generatedAt: string             // ISO date
  depth: 'quick' | 'deep'
  terms: { pali: string; gloss: string; occurrences: number }[]
  droppedClaimCount: number       // for "1 removed" and the graph's removed node
  retrievedCount: number
  report?: DeepReport             // only when depth === 'deep'
}
interface DeepReport { outline: string[]; sections: { heading: string; claims: VerifiedClaim[] }[] }
```
The evidence matrix and the star graph are **derived in the frontend** from `claims`, `sources` and `droppedClaimCount`; no extra endpoint.

### Other endpoints
| Endpoint | Purpose | Notes |
|---|---|---|
| `POST /verify-quote` | verify one saying | outcomes `FOUND_VERBATIM`, `CLOSE_PARAPHRASE` (with passages), `NOT_FOUND_IN_CORPUS`, plus the corpus-scope disclaimer |
| `POST /check-document` | upload or paste a document | async job; list of sayings with outcome and closest passage; multipart upload |
| `GET /texts` | collections, works and status | includes `planned` entries so the UI can show "not yet included" |
| `GET /texts/{work}/sections` | section list for the Reader | real section structure needed (the prototype titles are samples) |
| `GET /passages/{citationId}` | one passage, provenance, neighbours | feeds Source details and the Reader |
| `GET /terms`, `GET /terms/{id}` | term list and entry | glosses, variants, occurrences by text |
| `POST /clarify` | explain a passage | system-written; labelled |
| `POST /notes/enhance` | suggest a clearer note | system-written; labelled; original kept by the client |

### Later (needs accounts)
Chats and messages as a tree (edit and branch), notes and notebooks, saved passages, feedback and citation reports, share links, user settings. Until then, settings use `localStorage` and chats are in memory.

## Errors and CORS
One error shape: `{ code, message }`. The backend must allow the frontend origin (CORS) and send `text/event-stream` for `/ask`.

## Fixtures
`src/api/fixtures` must include: answered quick, answered deep, abstained (both reasons), streaming, stopped, error, empty corpus, passage with missing translator, and the DN 1 only coverage. Sample text is labelled sample.
