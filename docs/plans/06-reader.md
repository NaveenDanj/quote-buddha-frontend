# 06 Reader

Visual source: the Reader page in `docs/prototypes/workspace.html`. Behaviour rules: skill `reader-and-notes-ux`.

## Goal
A full-width Reader: toolbar on top, then a section outline, the text and (later) a side pane, with a compact ask bar at the bottom. Reading is one section at a time. Pali first, translation below a dashed rule.

## Build in four steps. Review after each one.

### Step 1: the reading view (this step)
- Template `ReaderLayout` (toolbar, outline, text, optional side pane and ask bar). Only the outline and the text scroll.
- Organisms `ReaderToolbar` (sutta picker, section select, Both / Pali / English, text size, outline toggle), `SectionOutline`, `ReaderText` with paragraphs and previous and next links.
- Paragraph actions in this step: copy citation and copy link only. Note, clarify and ask come with step 2 and 3.
- Data: `useGetSuttasQuery` and `useGetSuttaSectionsQuery`, shaped like RTK Query hooks, over a DN 1 fixture. All text is labelled "Layout sample".
- The text size button and the Settings dialog share one reading size, so changing it in one place shows in the other.
- Clicking a paragraph selects it. Changing section selects its first paragraph and returns to the top.

### Step 2: notes (done)
Side pane tab Notes, note box, This section or All, `NoteCard` list, AI enhance with "Your original" kept, selection toolbar, in-memory notes store.

### Step 3: Clarify, Ask and the selection toolbar (done)
Clarify block labelled as the system's wording, Ask list with source chips, and the ask bar with the context chip.

### Step 4: share, download, finishing
Share dialog, download menu, keyboard order, phone width, stories for every state.

## Backend needs (add to `docs/references/api-contract.md`, "NEEDS BACKEND")
`GET /texts`, `GET /texts/{work}/sections` with paragraphs (Pali and translation for each), `GET /passages/{citationId}`.

## Not in the first steps
Linked Pali terms inside paragraphs (the Terms page comes later), sharing a link to a passage that works outside this browser.
