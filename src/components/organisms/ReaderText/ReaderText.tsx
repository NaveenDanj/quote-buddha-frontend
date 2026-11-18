import { useRef } from 'react'
import { Button } from '@ds/atoms/Button'
import { Text } from '@ds/atoms/Text'
import type { ReaderAction, ReaderSection, ReadingView } from '@domain'
import { sectionPositionText, wording } from '@wording'
import { ReaderParagraph } from './ReaderParagraph'
import { ReaderSelectionBar } from './ReaderSelectionBar'

type ReaderTextProps = {
  workRef: string
  section: ReaderSection
  sectionNumber: number
  sectionCount: number
  previousSection?: ReaderSection
  nextSection?: ReaderSection
  onStepSection: (step: number) => void
  view: ReadingView
  selectedParagraphId?: string
  onSelectParagraph: (paragraphId: string) => void
  noteCountByParagraphId: Record<string, number>
  // A paragraph button or the toolbar over selected words. The words are given for the toolbar.
  onParagraphAction: (action: ReaderAction, paragraphId: string, selectedText?: string) => void
  getParagraphLink: (citationId: string) => string
}

type SectionFlipProps = {
  title: string
  caption: string
  direction: 'previous' | 'next'
  onClick: () => void
}

// A link to the section before or after: a quiet caption, then the Pali title as a text button.
function SectionFlip({ title, caption, direction, onClick }: SectionFlipProps) {
  const isNext = direction === 'next'
  const icons = isNext ? { trailingIcon: 'next' as const } : { leadingIcon: 'previous' as const }

  return (
    <div className={`grid gap-related ${isNext ? 'justify-items-end' : 'justify-items-start'}`}>
      <Text variant="small" isMuted>
        {caption}
      </Text>
      <Button variant="text" onClick={onClick} {...icons}>
        <span lang="pi">{title}</span>
      </Button>
    </div>
  )
}

function SectionHeader({
  section,
  sectionNumber,
  sectionCount,
}: Pick<ReaderTextProps, 'section' | 'sectionNumber' | 'sectionCount'>) {
  return (
    <header className="grid gap-related pb-card">
      <Text variant="small" isMuted>
        {`${sectionPositionText(sectionNumber, sectionCount)} · ${wording.sectionTitlesAreSamples}`}
      </Text>
      <Text variant="readerTitle" lang="pi">
        {section.paliTitle}
      </Text>
      <Text variant="ui" as="p" isMuted>
        {section.englishTitle}
      </Text>
    </header>
  )
}

type SectionFlipsProps = Pick<ReaderTextProps, 'previousSection' | 'nextSection' | 'onStepSection'>

// The links to the section before and after this one.
function SectionFlips({ previousSection, nextSection, onStepSection }: SectionFlipsProps) {
  return (
    <div className="flex justify-between gap-block border-t border-border pt-page">
      {previousSection ? (
        <SectionFlip
          direction="previous"
          title={previousSection.paliTitle}
          caption={wording.previousSectionLabel}
          onClick={() => onStepSection(-1)}
        />
      ) : (
        <span />
      )}
      {nextSection ? (
        <SectionFlip
          direction="next"
          title={nextSection.paliTitle}
          caption={wording.nextSectionLabel}
          onClick={() => onStepSection(1)}
        />
      ) : (
        <span />
      )}
    </div>
  )
}

// One section of the text, with links to the section before and after it.
export function ReaderText({
  workRef,
  section,
  sectionNumber,
  sectionCount,
  previousSection,
  nextSection,
  onStepSection,
  view,
  selectedParagraphId,
  onSelectParagraph,
  noteCountByParagraphId,
  onParagraphAction,
  getParagraphLink,
}: ReaderTextProps) {
  const articleRef = useRef<HTMLElement>(null)

  return (
    <article ref={articleRef} className="grid">
      <SectionHeader section={section} sectionNumber={sectionNumber} sectionCount={sectionCount} />
      <ul aria-label={wording.paragraphsLabel} className="grid list-none">
        {section.paragraphs.map((paragraph) => (
          <ReaderParagraph
            key={paragraph.id}
            paragraph={paragraph}
            workRef={workRef}
            linkText={getParagraphLink(paragraph.citationId)}
            view={view}
            isSelected={paragraph.id === selectedParagraphId}
            noteCount={noteCountByParagraphId[paragraph.id] ?? 0}
            onSelect={onSelectParagraph}
            onAction={onParagraphAction}
          />
        ))}
      </ul>
      <SectionFlips
        previousSection={previousSection}
        nextSection={nextSection}
        onStepSection={onStepSection}
      />
      <ReaderSelectionBar
        containerRef={articleRef}
        workRef={workRef}
        onAction={onParagraphAction}
      />
    </article>
  )
}
