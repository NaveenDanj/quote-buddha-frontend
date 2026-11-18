import type { ReaderParagraph, ReaderSection, Sutta } from '@domain'

export const sampleSuttas: Sutta[] = [
  { id: 'dn-1', workRef: 'DN 1', title: 'Brahmajāla Sutta', isIncluded: true },
  { id: 'dn-2', workRef: 'DN 2', title: 'Sāmaññaphala Sutta', isIncluded: false },
  { id: 'dn-3', workRef: 'DN 3', title: 'Ambaṭṭha Sutta', isIncluded: false },
  { id: 'mn-1', workRef: 'MN 1', title: 'Mūlapariyāya Sutta', isIncluded: false },
  { id: 'mn-2', workRef: 'MN 2', title: 'Sabbāsava Sutta', isIncluded: false },
]

type SectionSample = {
  paliTitle: string
  englishTitle: string
  paragraphCount: number
}

// The section titles and counts come from the prototype. They are layout samples, not the real structure of DN 1.
const dn1SectionSamples: SectionSample[] = [
  { paliTitle: 'Paribbājakakathā', englishTitle: 'The wanderers’ talk', paragraphCount: 3 },
  { paliTitle: 'Cūḷasīla', englishTitle: 'The shorter section on morality', paragraphCount: 3 },
  { paliTitle: 'Majjhimasīla', englishTitle: 'The middle section on morality', paragraphCount: 3 },
  { paliTitle: 'Mahāsīla', englishTitle: 'The longer section on morality', paragraphCount: 3 },
  { paliTitle: 'Pubbantakappikā', englishTitle: 'Speculations about the past', paragraphCount: 4 },
  {
    paliTitle: 'Aparantakappikā',
    englishTitle: 'Speculations about the future',
    paragraphCount: 4,
  },
  { paliTitle: 'Niṭṭhā', englishTitle: 'The conclusion', paragraphCount: 3 },
]

function buildParagraph(sectionNumber: number, paragraphNumber: number): ReaderParagraph {
  const id = `${sectionNumber}.${paragraphNumber}`
  return {
    id,
    citationId: `pitaka_lk:dn-1:${sectionNumber}:${paragraphNumber}`,
    paliText: `Layout sample: Pali text for ${id}.`,
    translationText: `Layout sample: the translation of ${id} sits beside the original. Real text appears here once the corpus is loaded.`,
  }
}

function buildSection(sample: SectionSample, position: number): ReaderSection {
  const sectionNumber = position + 1
  const paragraphNumbers = Array.from({ length: sample.paragraphCount }, (_, index) => index + 1)

  return {
    id: `dn-1-section-${sectionNumber}`,
    paliTitle: sample.paliTitle,
    englishTitle: sample.englishTitle,
    paragraphs: paragraphNumbers.map((paragraphNumber) =>
      buildParagraph(sectionNumber, paragraphNumber),
    ),
  }
}

export const sampleDn1Sections: ReaderSection[] = dn1SectionSamples.map(buildSection)
