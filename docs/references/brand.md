# Brand and token reference

Source of truth for token values. Visual reference: `docs/prototypes/design-system.html`. Rules for using tokens: skill `design-tokens`.

**Look:** near-monochrome, calm and scholarly. IBM Plex. One accent. 2px corners. No shadows, no gradients, no emoji. Hairline rules and space do the separating. State is never carried by color alone.

## Color (semantic tokens)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-page` | `#FFFFFF` | `#101010` | page background |
| `--color-surface-subtle` | `#F4F4F4` | `#1A1A1A` | system explanation box, selected row, chips pressed |
| `--color-text` | `#111111` | `#ECECEC` | body and headings |
| `--color-text-muted` | `#5E5E5E` | `#9C9C9C` | secondary text, input borders, glyph outlines |
| `--color-border` | `#DEDEDE` | `#2E2E2E` | hairlines and dividers (decorative, not a control boundary) |
| `--color-accent` | `#A8480A` | `#E8964A` | quotes, the verified evidence path, footnote markers, hover on primary |
| `--color-danger` | `#B3261E` | `#F2877E` | real errors only, never abstention |
| `--color-focus` | `#1F5FD1` | `#7FA8F5` | focus ring |
| `--color-scrim` | `rgb(0 0 0 / .5)` | same | behind dialogs |
| `--color-inverse-bg` | = text | = text | toast, selection toolbar |
| `--color-inverse-text` | = page | = page | text on inverse surfaces |

### Measured contrast (WCAG)
| Pair | Light | Dark |
|---|---|---|
| text on page | 18.88 | 16.11 |
| text on subtle | 17.17 | 14.73 |
| muted on page | 6.48 | 6.93 |
| muted on subtle | 5.90 | 6.34 |
| accent on page | 5.84 | 8.06 |
| accent on subtle | 5.31 | 7.37 |
| danger on page | 6.54 | 7.74 |
| focus on page | 5.81 | 7.99 |
| border on page (decorative only) | 1.35 | 1.40 |

All text pairs pass AA (4.5:1). **Decided (plan 03, batch B):** unselected chips use `--color-text-muted` as their boundary (6.48:1 light, 6.93:1 dark), like input borders. `--color-border` stays decorative (hairlines, dividers) and is never a control boundary.

## Typography
| Role | Family | Size / line | Weight |
|---|---|---|---|
| Display | IBM Plex Serif | 46 / 1.15 (clamp 32 to 46) | 400 |
| Heading 1 | IBM Plex Serif | 34 / 1.2 | 400 to 500 |
| Heading 2 | IBM Plex Serif | 26 / 1.2 | 500 |
| Heading 3 | IBM Plex Serif | 20 to 22 / 1.2 | 500 |
| Reading | IBM Plex Serif | 17 / 1.65 (times `--reading-scale`) | 400 |
| Reading large | IBM Plex Serif | 19 / 1.6 | 400 |
| Pali | IBM Plex Serif, `lang="pi"` | 20 / 1.75 | 400 |
| UI | IBM Plex Sans | 15 to 16 / 1.6 | 400, 500 |
| Label | IBM Plex Sans | 13 / 1.3, 600 | 600 |
| Caption | IBM Plex Sans | 13 | 400 |
| Code, citation IDs | IBM Plex Mono | 12 to 13 | 400, 500 |

Stacks: reading `"IBM Plex Serif", "Noto Serif Sinhala", Georgia, serif`; UI `"IBM Plex Sans", "Noto Sans Sinhala", system-ui, sans-serif`; code `"IBM Plex Mono", ui-monospace, Consolas, monospace`. Sinhala needs more line height than Latin; keep 1.55 or more for body.

`--reading-scale`: 0.9 (small), 1 (medium), 1.15 (large), 1.3 (extra large). Applies to chat reading text and the Reader.

## Space and shape
Space (4px base): `--spacing-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 24, `-6` 32, `-7` 48, `-8` 72 (named `--spacing-*` so Tailwind builds `p-4`, `gap-5` from them). Radius `--radius` 2px (one value). Borders are 1px hairlines; selected and focus use 2px. Side gutters are at least 16px and respect safe-area insets.

## Z-index scale
`--z-rail` 20 · `--z-topbar` 30 · `--z-panel` 50 · `--z-dialog` 70 · `--z-menu` 80 · `--z-toast` 90.

## Layout
`--layout-rail` 252 · `--layout-topbar` 52 · `--layout-panel` 380 (research panel) · `--layout-reader-side` 440 · `--layout-reader-outline` 220 · chat column max 920 · `--measure-reading` 62ch (quotes) · `--measure-wide` 110ch (Reader rows) · dialog widths 560, 620 (palette), 1280 (source graph) · control heights 28 (small), 34 (medium), 42 (composer send).

## Breakpoints
`sm` 760 (stack everything) · `md` 900 (hide Reader outline) · `lg` 1100 (side panes become drawers below this).

Other sizes: `--button-padding-x` 20 (button side padding), `--badge-size` 16, `--dot-size` 7 (streaming dot), `--meter-height` 6, `--glyph-size` 10 with `--glyph-outline` 1.5, `--text-stamp` 12.

## Motion
`--motion-fast` 120ms, `--motion-base` 180ms, ease. Drawers and panel slides use base. `prefers-reduced-motion` removes transitions and the streaming blink.

## Icons
Line icons, stroke 1.6, round caps and joins, `currentColor`. Sizes `--icon-small` 16, `--icon-medium` 18, `--icon-large` 20. Implemented with `lucide-react` behind the `Icon` atom. Mapping from the prototype:
close→`X`, copy→`Copy`, cite→`Quote`, regenerate→`RefreshCw`, save to notebook→`Bookmark`, notes→`NotebookPen`/`StickyNote`, evidence matrix→`Grid3x3`, source graph→`Network`, reader→`BookOpen`, search→`Search`, share→`Share2`, download→`Download`, link→`Link`, settings→`SlidersHorizontal`, menu→`Menu`, new→`Plus`, send→`ArrowUp`, stop→`Square`, attach→`Paperclip`, edit→`Pencil`, chevrons→`ChevronLeft/Right/Down`, helpful→`ThumbsUp`/`ThumbsDown`, report→`Flag`, more→`Ellipsis`, research panel→`PanelRight`, sections list→`PanelLeft`, compare→`Columns2`, terms→`Type`, verify→`ShieldCheck`, check document→`FileCheck`, AI→`Sparkles`, ask→`MessageSquare`, delete→`Trash2`, done→`Check`.
Icon-only buttons need an `aria-label`. There are no tooltips.

## Evidence glyphs
A 10px square with 1.5px outline. **Filled** = direct quote. **Hatched** (45°, 2px lines) = not verified. **Dashed outline** = no support, removed, not used, abstained, or planned (not yet included). One pattern token, `--pattern-hatch`, plus an SVG `<pattern>` helper for the graph.

Lines in the source graph: solid accent 2.25px = verified path; dashed 1.25px = not verified; dotted 1px = removed; faint dashed = not yet in the database.
