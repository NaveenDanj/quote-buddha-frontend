# Component inventory

Every component has a story. Only atoms (and hooks and plain logic) have a test file. Status: `planned` until built. Visual reference for each: `docs/prototypes/workspace.html` (or `design-system.html`). Layer rules: skill `atomic-design-conventions`.

## Design system atoms (`src/design-system/atoms/`, domain-neutral, 32)
| Component | Responsibility |
|---|---|
| `Icon` | One wrapper over `lucide-react`: size and stroke from tokens, decorative by default |
| `IconButton` | Icon-only button; sizes sm and md; `solid` and `pressed` states; requires `aria-label` |
| `Button` | Primary, secondary and text variants; optional leading icon; small size |
| `Link` | Underlined link with accent hover |
| `Text` | Roles: display, heading, reading, pali (`lang="pi"`), ui, caption, code |
| `Input` | Single-line field |
| `Textarea` | Multi-line field (also the composer base) |
| `Select` | Styled select (Radix) |
| `Checkbox` | Checkbox with label |
| `Chip` | Toggle chip with optional icon; pressed, disabled (dashed) |
| `Tag` | Label with a leading glyph (filled, hatched, dashed, plain) |
| `CountBadge` | Small count on an icon button |
| `Stamp` | Mono caption or key hint ("Ctrl K") |
| `Divider` | Hairline rule |
| `Surface` | The box that holds a group: a grid with a look (subtle, dashed, framed, inverse), padding and gap. Use it instead of a styled `div` |
| `Field` | Label, hint and error text around one form control |
| `GlyphSquare` | The square shown in front of evidence words: filled, hatched or dashed |
| `RemovableChip` | Label with a remove button |
| `Mark` | Accent underline for compared words |
| `Skeleton` | Loading placeholder |
| `LiveDot` | The blinking streaming indicator (respects reduced motion) |
| `VisuallyHidden` | Screen-reader-only text |
| `Meter` | Thin progress line and horizontal bar |
| `DropZone` | File drop area with a hidden file input |
| `Tabs` | Underline tabs (Radix) |
| `SegmentedControl` | Pressed-state button group |
| `Disclosure` | Details and summary |
| `DataTable` | Table with real headers, horizontal scroll container |
| `FactList` | Label and value list (`dl`) |
| `Breadcrumbs` | Canon location trail |
| `ListRow` | Bordered row for lists of links or buttons |
| `Dialog` | Modal (Radix): scrim, focus trap, Escape, return focus |
| `Menu` | Popup menu with arrow keys (Radix) |
| `Popover` | Anchored panel (Radix) |
| `HoverCard` | Hover and focus preview card (Radix) |
| `Toast` | Status message (Radix), bottom centre |

## Domain molecules (`src/components/molecules/`, 25)
`EvidenceGlyph` · `EvidenceTag` (Tag + evidence state text) · `CiteLink` (citation ID as a link) · `FootnoteMarker` (`[1]`, opens the source) · `TermLink` (dotted Pali term) · `GlossChip` (term and gloss) · `SourceChip` (numbered source) · `ContextChip` ("On 5.2") · `FileChip` · `PassageQuote` (the only quote style) · `SystemExplanation` (labelled "not a quotation") · `Notice` (abstention) · `ActionBar` (icon row) · `FeedbackActions` · `VersionSwitcher` · `SectionStepper` · `Legend` · `CoverageStrip` (squares per sutta) · `SelectionToolbar` · `NoteCard` · `SuggestionBlock` (AI-written, labelled) · `ChatRow` (with options menu) · `CommandItem` · `SuggestionChips` · `StreamingSteps`

## Organisms (`src/components/organisms/`, 35)
- **Shell:** `Rail`, `ChatHistory`, `TopBar`, `Composer`, `SlashMenu`
- **Chat:** `UserMessage` (edit and branch), `AssistantMessage`, `ClaimList`, `DeepReport`, `AbstainNotice`, `NewChatHero`
- **Research panel:** `ResearchPanel` (Sources, Evidence, Terms, Notes), `EvidenceMatrix`, `SourceDetails`, `StarGraph`, `SourceGraphDialog`
- **Dialogs:** `ShareDialog`, `ReportCitationDialog`, `SettingsDialog`, `CommandPalette`
- **Reader:** `ReaderToolbar`, `SuttaPicker`, `SectionOutline`, `ReaderText`, `ReaderParagraph`, `NotesPane`, `NoteEditor`, `ClarifyPane`, `AskPane`
- **Tools:** `VerifyResult`, `DocumentResults`, `TermEntry`, `ComparePanel`, `NotebookView`, `CorpusCoverage`

## Templates (`src/templates/`, 5)
`AppShell` (rail, top bar, main, optional docked panel) · `ChatLayout` (thread and sticky composer) · `ToolLayout` (single column) · `ReaderLayout` (toolbar, three columns, compact ask bar) · `CenteredHeroLayout`

## Pages (`src/pages/`, 8)
`NewChat` · `Conversation` · `Reader` · `Terms` · `Compare` · `Notebook` · `Verify` · `CheckDocument`

## Phasing
1. Tokens and Foundations docs. 2. Atoms. 3. Molecules. 4. Chat organisms and `NewChat`, `Conversation`, `Verify`. 5. Reader. 6. Terms, Compare, Notebook, CheckDocument, Settings, Command palette, Share and Report dialogs. 7. Wire to the real API.

## Prototype to component map (where to look)
Chat and composer: workspace → "Conversation" and "New chat" · Research panel: Sources, Evidence, Terms, Notes tabs · Source graph: the dialog on any answer · Reader: "Reader" page · Verify, Check a document, Terms, Compare, Notebook: their pages · Dialogs: Share, Report, Settings, Command palette.
