import type { AnswerSource } from './answer'
import { TextLanguage } from './language'

export function getCitationLabel(source: AnswerSource): string {
  const section = source.location.section
  return section ? `${source.workRef} · ${section}` : source.workRef
}

export function findSource(sources: AnswerSource[], citationId: string): AnswerSource | undefined {
  return sources.find((source) => source.citationId === citationId)
}

export function getSourceNumber(sources: AnswerSource[], citationId: string): number | undefined {
  const position = sources.findIndex((source) => source.citationId === citationId)
  return position === -1 ? undefined : position + 1
}

export function toTextLanguage(code: string): TextLanguage {
  if (code === TextLanguage.pali) {
    return TextLanguage.pali
  }
  if (code === TextLanguage.sinhala) {
    return TextLanguage.sinhala
  }
  if (code === TextLanguage.english) {
    return TextLanguage.english
  }
  return TextLanguage.unknown
}
