import { useNavigate } from 'react-router'
import { EmptyState } from '@ds/atoms/EmptyState'
import { wording } from '@wording'
import { NotebookAside } from '@components/organisms/NotebookAside'
import { NotebookHeader } from '@components/organisms/NotebookHeader'
import { NotebookNoteCard } from '@components/organisms/NotebookNoteCard'
import { NotebookNoteEditor } from '@components/organisms/NotebookNoteEditor'
import { doNothingYet } from '@pages/doNothingYet'
import { getChatPath } from '@pages/routes'
import { ToolId } from '@pages/workspaceTools'
import { WorkspaceFrame } from '@pages/WorkspaceFrame'
import { ToolPageLayout, ToolPageWidth } from '@templates/ToolPageLayout'
import { TwoColumnLayout } from '@templates/TwoColumnLayout'
import { useNotebook } from './useNotebook'

export function Notebook() {
  const navigate = useNavigate()
  const notebook = useNotebook()

  return (
    <WorkspaceFrame title={wording.navNotebookLabel} currentToolId={ToolId.notebook}>
      <ToolPageLayout width={ToolPageWidth.broad}>
        <NotebookHeader
          title={notebook.title}
          onExportMarkdown={notebook.exportMarkdown}
          onExportBibtex={notebook.exportBibtex}
        />
        <TwoColumnLayout
          main={
            <>
              {notebook.entries.length === 0 ? (
                <EmptyState
                  icon="notes"
                  title={wording.noEntriesText}
                  description={wording.noEntriesHintText}
                />
              ) : (
                <ul aria-label={wording.notebookNotesLabel} className="grid list-none gap-page">
                  {notebook.entries.map((entry) => (
                    <li key={entry.id}>
                      <NotebookNoteCard entry={entry} onOpenPassage={doNothingYet} />
                    </li>
                  ))}
                </ul>
              )}
              <NotebookNoteEditor
                value={notebook.draft}
                onValueChange={notebook.setDraft}
                onSave={notebook.saveDraft}
              />
            </>
          }
          aside={
            <NotebookAside
              chats={notebook.chats}
              onOpenChat={(chatId) => navigate(getChatPath(chatId))}
              sources={notebook.sources}
              onOpenSource={doNothingYet}
            />
          }
        />
      </ToolPageLayout>
    </WorkspaceFrame>
  )
}
