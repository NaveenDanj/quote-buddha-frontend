import { formatNoteDate, type NotebookEntry, type SourceUse } from '@domain'
import {
  notebookExportFooter,
  notebookExportReference,
  notebookExportTitle,
  wording,
} from '@wording'

function buildEntryMarkdown(entry: NotebookEntry): string {
  const date = formatNoteDate(entry.createdAtInMilliseconds)
  const heading = entry.passage
    ? `${entry.passage.label} · ${date}`
    : `${wording.navNotebookLabel} · ${date}`
  const lines = [`## ${heading}`, entry.text]

  if (entry.isAiEnhanced) {
    lines.push(`*${wording.aiEnhancedExportMarker}*`)
  }
  if (entry.passage) {
    lines.push(notebookExportReference(entry.passage.label, entry.passage.citationId))
  }
  return lines.join('\n\n')
}

// The notebook as Markdown. A note the system rewrote keeps its marker, and every passage keeps its reference.
export function buildNotebookMarkdown(
  title: string,
  entries: NotebookEntry[],
  generatedAtInMilliseconds: number,
): string {
  const sections = entries.map(buildEntryMarkdown)
  const footer = notebookExportFooter(formatNoteDate(generatedAtInMilliseconds))
  return [`# ${notebookExportTitle(title)}`, ...sections, '---', footer].join('\n\n')
}

function toBibtexKey(citationId: string): string {
  return citationId.replace(/[^a-zA-Z0-9]+/g, '_')
}

// One entry for each passage the notes are about.
export function buildNotebookBibtex(sources: SourceUse[]): string {
  return sources
    .map((source) =>
      [
        `@misc{${toBibtexKey(source.citationId)},`,
        `  title = {${source.label}},`,
        `  note = {${wording.editionName}, corpus ${wording.corpusVersionName}}`,
        '}',
      ].join('\n'),
    )
    .join('\n\n')
}
