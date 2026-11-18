import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
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
        <div className="grid gap-group">
          <Text variant="heading1" as="h1">
            {wording.navCheckLabel}
          </Text>
          <Text variant="ui" as="p" isMuted className="max-w-(--measure-reading)">
            {wording.checkDocumentIntro}
          </Text>
        </div>
        <DocumentCheckForm
          chosenFileName={documentCheck.chosenFile?.name}
          onFileChosen={documentCheck.setChosenFile}
          pastedText={documentCheck.pastedText}
          onPastedTextChange={documentCheck.setPastedText}
          canCheck={documentCheck.canCheck}
          isChecking={documentCheck.isChecking}
          onCheck={documentCheck.check}
        />
        {documentCheck.result ? (
          <DocumentCheckResult
            sayings={documentCheck.result.sayings}
            onOpenPassage={doNothingYet}
            onExportReport={doNothingYet}
          />
        ) : null}
      </ToolPageLayout>
    </WorkspaceFrame>
  )
}
