---
name: reader-and-notes-ux
description: Behaviour and labelling rules for the Reader (sutta picker, section-by-section reading, parallel text, selection toolbar, notes, AI-enhanced notes, Clarify, Ask, share and export). Use when building or reviewing any Reader or notes component.
---

# Reader and notes UX

Visual source: the Reader page in `docs/prototypes/workspace.html`. Honesty rules: skill `evidence-ui-integrity`.

## Layout
- Full width. Toolbar on top, then three columns: section outline, text, side pane (Notes, Clarify, Ask). A compact one-line ask bar sits at the bottom, with a context chip showing which passage the question is about.
- Pali and translation show in two **rows** per paragraph (Pali first, translation below a dashed rule), not two columns, so more text fits. View toggle: Both, Pali, English. In English-only the translation becomes the main line.
- Wide screens show all three columns. Under 1100px the side pane becomes a drawer; under 900px the outline hides and the section dropdown replaces it; under 760px everything stacks.
- Reading text size uses `--reading-scale`; Pali is `lang="pi"` and keeps diacritics (a setting can show plain letters).

## Picking and moving
- The sutta picker lists DN 1 as open and everything else as "not yet included" (disabled, with the reason).
- Reading is **section by section**: previous and next buttons, a section dropdown with "3 / 7", and previous or next links at the bottom. Changing section resets scroll and selects the section's first paragraph.

## Passage actions
- Each paragraph offers icon actions: add a note, clarify the meaning, ask about this, copy citation, copy link. They show on hover and focus, and always on touch.
- Selecting text shows a small toolbar with note, clarify, ask, cite. The selected text becomes the context chip.
- Clicking a paragraph selects it (accent rule on the left) and sets the context for the side pane and the ask bar.

## Notes
- A note belongs to a passage ID (`DN 1 · 5.2`) and a section. Notes list filters by "This section" or "All". The passage reference is a link that jumps back to the passage.
- **AI enhance:** shows a suggestion labelled "Suggested by the system. Written by the system. Check it against the passage." The user accepts (copied into the note box, not saved yet) or discards. Saving an enhanced note marks it "AI-enhanced" and keeps "Your original" in a disclosure.
- Notes are never silently changed by the system. Deleting asks nothing but is undoable via toast when persistence exists.
- Notes with the system's wording keep the system label even after export.

## Clarify
Sections: plain meaning, key Pali terms (with glosses), in context, what this does not say. The whole block is labelled as the system's explanation, not a quotation, and lists the passage it is based on. It can be saved as a note (marked AI-enhanced).

## Ask
Questions about a passage get answers with source chips and the same labelling as chat answers. Answers can be copied or saved as a note. Suggested questions appear until the first question.

## Share and download
- Share opens the share dialog titled "Share notes on DN 1".
- Download menu: copy as Markdown, download Markdown, download PDF, copy references as BibTeX, add to Notebook. Markdown includes section headings, passage references with citation IDs, the AI-enhanced marker, and the corpus version.
- In sandboxed previews downloads may be unavailable; copy still works.

## Keyboard
Arrow keys step sections from the stepper; the outline and selection toolbar are reachable by Tab; Escape closes menus and the selection toolbar.
