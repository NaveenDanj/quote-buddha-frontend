import { useState } from 'react'
import { clampSectionIndex } from '@domain'
import { useGetSuttaSectionsQuery, useGetSuttasQuery } from '@api/reader'

const firstSuttaId = 'dn-1'

// Where we are: which text, which section, which paragraph. Changing section selects its first paragraph.
// The text goes back to the top in the layout.
export function useReaderPosition() {
  const { data: suttas } = useGetSuttasQuery()
  const [suttaId, setSuttaId] = useState(firstSuttaId)
  const { data: sections } = useGetSuttaSectionsQuery(suttaId)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [selectedParagraphId, setSelectedParagraphId] = useState<string>()

  const allSuttas = suttas ?? []
  const allSections = sections ?? []
  const currentSection = allSections[sectionIndex]
  const currentParagraphId = selectedParagraphId ?? currentSection?.paragraphs[0]?.id
  const currentParagraph = currentSection?.paragraphs.find(
    (paragraph) => paragraph.id === currentParagraphId,
  )

  function changeSection(index: number) {
    const nextIndex = clampSectionIndex(index, allSections.length)
    setSectionIndex(nextIndex)
    setSelectedParagraphId(allSections[nextIndex]?.paragraphs[0]?.id)
  }

  function chooseSutta(nextSuttaId: string) {
    setSuttaId(nextSuttaId)
    setSectionIndex(0)
    setSelectedParagraphId(undefined)
  }

  // Jumps to a passage that a note is about.
  function openPassage(citationId: string) {
    allSections.forEach((section, index) => {
      const paragraph = section.paragraphs.find((candidate) => candidate.citationId === citationId)
      if (paragraph) {
        setSectionIndex(index)
        setSelectedParagraphId(paragraph.id)
      }
    })
  }

  function getCitationId(paragraphId: string): string | undefined {
    return currentSection?.paragraphs.find((paragraph) => paragraph.id === paragraphId)?.citationId
  }

  return {
    suttaId,
    suttas: allSuttas,
    currentSutta: allSuttas.find((sutta) => sutta.id === suttaId),
    chooseSutta,
    sections: allSections,
    currentSection,
    sectionIndex,
    changeSection,
    selectedParagraphId: currentParagraphId,
    selectedCitationId: currentParagraph?.citationId,
    getCitationId,
    setSelectedParagraphId,
    openPassage,
  }
}
