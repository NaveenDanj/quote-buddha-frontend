import { wording } from '@wording'
import { CheckTextBox } from '@components/molecules/CheckTextBox'
import { ToolPageHeading } from '@components/molecules/ToolPageHeading'
import { QuoteCheckResult } from '@components/organisms/QuoteCheckResult'
import { doNothingYet } from '@pages/doNothingYet'
import { ToolId } from '@pages/workspaceTools'
import { WorkspaceFrame } from '@pages/WorkspaceFrame'
import { ToolPageLayout, ToolPageWidth } from '@templates/ToolPageLayout'
import { useQuoteCheck } from './useQuoteCheck'

const quoteRowCount = 3

export function VerifyQuote() {
  const quoteCheck = useQuoteCheck()

  return (
    <WorkspaceFrame title={wording.navVerifyLabel} currentToolId={ToolId.verify}>
      <ToolPageLayout width={ToolPageWidth.narrow}>
        <ToolPageHeading title={wording.navVerifyLabel} intro={wording.verifyPageIntro} />

        <CheckTextBox
          label={wording.verifyTextLabel}
          placeholder={wording.verifyPlaceholder}
          value={quoteCheck.quote}
          onValueChange={quoteCheck.setQuote}
          rowCount={quoteRowCount}
          scopeText={wording.verifyScope}
          buttonLabel={wording.checkQuoteLabel}
          canCheck={quoteCheck.canCheck}
          isChecking={quoteCheck.isChecking}
          onCheck={quoteCheck.check}
        />

        <QuoteCheckResult
          results={quoteCheck.results}
          selectedOutcome={quoteCheck.selectedOutcome}
          onSelectOutcome={quoteCheck.setSelectedOutcome}
          onOpenPassage={doNothingYet}
        />
      </ToolPageLayout>
    </WorkspaceFrame>
  )
}
