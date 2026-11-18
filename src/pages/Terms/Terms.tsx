import { EmptyState } from '@ds/atoms/EmptyState'
import { wording } from '@wording'
import { ToolPageHeading } from '@components/molecules/ToolPageHeading'
import { TermDetails } from '@components/organisms/TermDetails'
import { TermFinder } from '@components/organisms/TermFinder'
import { doNothingYet } from '@pages/doNothingYet'
import { ToolId } from '@pages/workspaceTools'
import { WorkspaceFrame } from '@pages/WorkspaceFrame'
import { ListDetailLayout } from '@templates/ListDetailLayout'
import { ToolPageLayout, ToolPageWidth } from '@templates/ToolPageLayout'
import { useTerms } from './useTerms'

export function Terms() {
  const terms = useTerms()

  return (
    <WorkspaceFrame title={wording.navTermsLabel} currentToolId={ToolId.terms}>
      <ToolPageLayout width={ToolPageWidth.broad}>
        <ToolPageHeading title={wording.navTermsLabel} intro={wording.termsIntro} isInline />
        <ListDetailLayout
          list={
            <TermFinder
              terms={terms.terms}
              selectedTermId={terms.selectedTermId}
              query={terms.query}
              onQueryChange={terms.setQuery}
              onSelectTerm={terms.chooseTerm}
            />
          }
          detail={
            terms.term ? (
              <TermDetails
                term={terms.term}
                onOpenPassage={doNothingYet}
                onOpenReader={terms.openReader}
                onAskAboutTerm={terms.askAboutTerm}
              />
            ) : (
              <EmptyState icon="terms" title={wording.noResultsText} />
            )
          }
        />
      </ToolPageLayout>
    </WorkspaceFrame>
  )
}
