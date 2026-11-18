import { FactList } from '@ds/atoms/FactList'
import { compareTerms, type ComparableOption, type ComparablePassage } from '@domain'
import { wording } from '@wording'
import { ComparePassageColumn } from './ComparePassageColumn'

type CompareViewProps = {
  options: ComparableOption[]
  firstCitationId?: string
  secondCitationId?: string
  onChooseFirst: (citationId: string) => void
  onChooseSecond: (citationId: string) => void
  firstPassage?: ComparablePassage
  secondPassage?: ComparablePassage
}

function listTerms(terms: string[]) {
  return <span lang="pi">{terms.length > 0 ? terms.join(', ') : wording.noTermsLabel}</span>
}

// Two passages side by side, with the terms they share underlined, and a list of what is shared and what is not.
export function CompareView({
  options,
  firstCitationId,
  secondCitationId,
  onChooseFirst,
  onChooseSecond,
  firstPassage,
  secondPassage,
}: CompareViewProps) {
  const comparison = compareTerms(firstPassage?.terms ?? [], secondPassage?.terms ?? [])
  const facts = [
    { label: wording.sharedTermsLabel, value: listTerms(comparison.shared) },
    { label: wording.onlyInALabel, value: listTerms(comparison.onlyInFirst) },
    { label: wording.onlyInBLabel, value: listTerms(comparison.onlyInSecond) },
  ]

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(var(--layout-compare-column),1fr))] gap-page">
        <ComparePassageColumn
          label={wording.passageALabel}
          options={options}
          selectedCitationId={firstCitationId}
          onChoosePassage={onChooseFirst}
          passage={firstPassage}
          markedTerms={comparison.shared}
        />
        <ComparePassageColumn
          label={wording.passageBLabel}
          options={options}
          selectedCitationId={secondCitationId}
          onChoosePassage={onChooseSecond}
          passage={secondPassage}
          markedTerms={comparison.shared}
        />
      </div>
      <FactList facts={facts} />
    </>
  )
}
