---
name: evidence-ui-integrity
description: UI rules for showing evidence, citations, quotes, abstention and system-written text honestly. The frontend twin of the backend's rag-attribution-integrity. Use when building or reviewing any answer, citation, verify, evidence or graph component, or any copy about what the texts say.
---

# Evidence UI integrity

Backend rules: `../quote-buddha/.claude/skills/rag-attribution-integrity/SKILL.md`. Fixed copy: `docs/references/wording.md`.

## Hard rules
1. **Quoted words are only ever the stored passage text.** Only `PassageQuote` uses the quote style (accent rule, reading serif). Nothing else looks like a quotation.
2. **System-written text is always labelled.** The simple answer, clarifications, AI-enhanced notes, suggestions and Ask answers say they are the system's own wording and are not quotations. Use `SystemExplanation` or `SuggestionBlock`; never style them as quotes.
3. **Never "the Buddha said".** Use "attributed to the Buddha in DN 1". "Not found" means "not found in the included corpus (by these methods)", never "the Buddha did not say it".
4. **Abstention is a finding.** Dashed outline, calm copy, fixed backend text, a corpus-scope note, and a next step (try another question, see what is included). Never red, never an error or apology style.
5. **Evidence state is glyph plus text, never color alone.**
   - Direct quote: filled square.
   - Not verified: hatched square.
   - Not used / no support / removed: dashed outline square.
   - Planned or not-yet-included text: dashed node or border, labelled "not yet included".
6. **A claim that failed verification is never shown as supported.** A removed claim shows as removed (matrix and graph) or not at all; it never appears in the answer body.
7. **Every citation resolves.** A citation chip opens its source record. If the passage cannot load, show a calm error, never an empty card.
8. **Gaps are stated.** "Translator: not recorded in source." "Parallel text: not checked yet." Never blank, never guessed.
9. **Scope notes everywhere it matters.** Answers, Verify results and document results carry the included-texts-only disclaimer.
10. **Sample content is marked.** Placeholders say "Layout sample". Never pair a real quotation with a made-up citation ID.

## Where the state rules live in code
- States are `EvidenceState.*` and shapes are `EvidenceShape.*` (`src/domain/evidence.ts`). The shape for each state comes only from `getEvidenceShape`, and the words only from `evidenceStateText` (`src/wording`). Never compare to or write a state as a loose string, and never pick a shape inside a component.
- Adding a state means adding it in all three places; the compiler fails until you do.

## Components that carry these rules
`EvidenceGlyph`, `EvidenceTag`, `PassageQuote`, `CiteLink`, `FootnoteMarker`, `SystemExplanation`, `Notice`, `AbstainNotice`, `EvidenceMatrix`, `StarGraph`, `VerifyResult`, `DocumentResults`, `SuggestionBlock`. Change one of them and the wording-auditor must run.

## Graph and matrix
- The star graph shows answer, claims, citations and Tipiṭaka text. Line style carries support: solid accent for direct quote, dashed for not verified, dotted for removed. Node glyph repeats the state; a text list alternative is always present.
- The matrix has claims as rows, retrieved passages as columns, and the same glyphs. Include a legend.

## Check before done
- [ ] Each evidence state shows glyph and text.
- [ ] No "the Buddha said" for unverified or system-written content.
- [ ] Abstention uses the fixed backend text and the dashed style.
- [ ] System text is labelled. Fixed copy comes from `src/wording`.
- [ ] Run `wording-auditor`.
