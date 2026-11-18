import { wording } from '@wording'
import { ToolPageHeading } from '@components/molecules/ToolPageHeading'
import { DocumentCheckForm } from '@components/organisms/DocumentCheckForm'
import { DocumentCheckResult } from '@components/organisms/DocumentCheckResult'
import { doNothingYet } from '@pages/doNothingYet'
import { ToolId } from '@pages/workspaceTools'
import { WorkspaceFrame } from '@pages/WorkspaceFrame'
import { ToolPageLayout } from '@templates/ToolPageLayout'
import { useDocumentCheck } from './useDocumentCheck'

export function CheckDocument() {
  const documentCheck = useDocumentCheck()

  return (
    <WorkspaceFrame title={wording.navCheckLabel} currentToolId={ToolId.checkDocument}>
      <ToolPageLayout>
        <ToolPageHeading title={wording.navCheckLabel} intro={wording.checkDocumentIntro} />
        <DocumentCheckForm
          chosenFileName={documentCheck.chosenFile?.name}
          onFileChosen={documentCheck.setChosenFile}
          pastedText={documentCheck.pastedText}
          onPastedTextChange={documentCheck.setPastedText}
          canCheck={documentCheck.canCheck}
          isChecking={documentCheck.isChecking}
          onCheck={documentCheck.check}
        />
        <DocumentCheckResult
          sayings={documentCheck.result.sayings}
          onOpenPassage={doNothingYet}
          onExportReport={doNothingYet}
        />
      </ToolPageLayout>
    </WorkspaceFrame>
  )
}
