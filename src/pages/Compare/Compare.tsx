import { wording } from '@wording'
import { ToolPageHeading } from '@components/molecules/ToolPageHeading'
import { CompareActions, CompareView } from '@components/organisms/CompareView'
import { ToolId } from '@pages/workspaceTools'
import { WorkspaceFrame } from '@pages/WorkspaceFrame'
import { ToolPageLayout, ToolPageWidth } from '@templates/ToolPageLayout'
import { useCompare } from './useCompare'

export function Compare() {
  const compare = useCompare()

  return (
    <WorkspaceFrame title={wording.navCompareLabel} currentToolId={ToolId.compare}>
      <ToolPageLayout width={ToolPageWidth.broad}>
        <ToolPageHeading title={wording.compareTitle} intro={wording.compareIntro} isInline />
        <CompareView
          options={compare.options}
          firstCitationId={compare.firstCitationId}
          secondCitationId={compare.secondCitationId}
          onChooseFirst={compare.chooseFirst}
          onChooseSecond={compare.chooseSecond}
          firstPassage={compare.firstPassage}
          secondPassage={compare.secondPassage}
        />
        <CompareActions
          onAddToNotebook={compare.addToNotebook}
          onAskAboutDifference={compare.askAboutDifference}
        />
      </ToolPageLayout>
    </WorkspaceFrame>
  )
}
