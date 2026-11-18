import { EmptyState } from '@ds/atoms/EmptyState'
import { wording } from '@wording'
import { AskBar } from '@components/organisms/AskBar'
import { ReaderText } from '@components/organisms/ReaderText'
import { SectionOutline } from '@components/organisms/SectionOutline'
import { ToolId } from '@pages/workspaceTools'
import { WorkspaceFrame } from '@pages/WorkspaceFrame'
import { ReaderLayout } from '@templates/ReaderLayout'
import { ReaderSide } from './ReaderSide'
import { ReaderTools } from './ReaderTools'
import { useReader } from './useReader'
import { useReaderAssist } from './useReaderAssist'

function NothingToRead() {
  return (
    <WorkspaceFrame title={wording.navReaderLabel} currentToolId={ToolId.reader}>
      <EmptyState icon="reader" title={wording.noSectionsText} />
    </WorkspaceFrame>
  )
}

export function Reader() {
  const reader = useReader()
  const assist = useReaderAssist(reader)
  const { currentSutta, currentSection } = reader

  if (!currentSutta || !currentSection) {
    return <NothingToRead />
  }

  return (
    <WorkspaceFrame title={wording.navReaderLabel} currentToolId={ToolId.reader}>
      <ReaderLayout
        isOutlineOpen={reader.isOutlineOpen}
        isSideOpen={reader.isSideOpen}
        scrollResetKey={currentSection.id}
        toolbar={
          <ReaderTools
            reader={reader}
            currentSutta={currentSutta}
            noteCount={assist.notes.noteCount}
          />
        }
        outline={
          <SectionOutline
            workRef={currentSutta.workRef}
            sections={reader.sections}
            currentIndex={reader.sectionIndex}
            onSelectSection={reader.changeSection}
          />
        }
        side={<ReaderSide workRef={currentSutta.workRef} reader={reader} assist={assist} />}
        askBar={
          <AskBar
            contextLabel={assist.contextLabel}
            value={assist.ask.question}
            onValueChange={assist.ask.setQuestion}
            onSubmit={assist.submitAskBar}
          />
        }
      >
        <ReaderText
          workRef={currentSutta.workRef}
          section={currentSection}
          sectionNumber={reader.sectionIndex + 1}
          sectionCount={reader.sections.length}
          previousSection={reader.sections[reader.sectionIndex - 1]}
          nextSection={reader.sections[reader.sectionIndex + 1]}
          onStepSection={(step) => reader.changeSection(reader.sectionIndex + step)}
          view={reader.view}
          selectedParagraphId={reader.selectedParagraphId}
          onSelectParagraph={reader.setSelectedParagraphId}
          noteCountByParagraphId={assist.notes.noteCountByParagraphId}
          onParagraphAction={assist.startAction}
          getParagraphLink={reader.getParagraphLink}
        />
      </ReaderLayout>
    </WorkspaceFrame>
  )
}
