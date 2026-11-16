---
name: api-contract-mirroring
description: How the frontend mirrors the backend API and Answer model, where types and fixtures live, how mocks stay honest while endpoints do not exist yet, and how to request backend changes. Use when adding or changing anything in src/api, or building a component that needs server data.
---

# API contract mirroring

Contract: `docs/references/api-contract.md`. Backend source of truth: `../quote-buddha` (`src/quote_buddha/answering/models/answer.py` and the controllers under `api/`).

## Rules
- Types in `src/api/types.ts` mirror the backend names and meanings: `Answer`, `VerifiedClaim`, `AnswerSource`, `AbstentionReason`, `EvidenceLabel`. Do not invent fields. If the UI needs something the backend does not send, mark it `// NEEDS BACKEND` in the contract doc and in a short plan to hand to the backend repo.
- Convert snake_case to camelCase in one place (`src/api/client.ts`); components only see camelCase.
- Only `src/api` calls the network. Hooks (`useAskStream`, `useVerifyQuote`, `usePassage`, and so on) wrap TanStack Query. Pages call hooks; organisms get props.
- Validate responses at the boundary (a small schema per response). A malformed answer shows the calm error state, never a broken page.
- Status and labels are exhaustive unions (`'ANSWERED' | 'ABSTAINED'`; `'DIRECT' | 'UNVERIFIED'`). Switch statements must be exhaustive so a new backend value fails the type check.

## Mocks until the backend exists
- `/api/v1/ask`, `/verify-quote`, passages, terms, clarify and notes are served by MSW handlers in `src/api/mocks`, built from fixtures that follow the contract exactly (including the SSE step events).
- Fixtures cover: answered (direct and unverified claims, a dropped claim), abstained (each `AbstentionReason`), streaming, stopped, network error, empty corpus.
- Fixture text is marked sample and never pairs a real quotation with a made-up citation.
- When a real endpoint lands, change only the base URL and the contract doc, not the components. Contract tests compare fixtures with the backend's JSON examples.

## Streaming
The assistant answer arrives as server-sent events: `step` events (`searching`, `retrieved`, `drafting`, `verifying`) and a final `answer` event carrying the `Answer`. The client exposes a typed event stream and supports abort. Define the event shapes in the contract before building UI that depends on them.

## Asking the backend for changes
Write the request as a short section in `docs/references/api-contract.md` under "Needs backend", with the field, why the UI needs it, and an example payload. The backend plan lives in `../quote-buddha/docs/plans/`.
