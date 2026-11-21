import { Button } from '@ds/atoms/Button'
import { wording } from '@wording'

type CompareActionsProps = {
  onAddToNotebook: () => void
  onAskAboutDifference: () => void
}

export function CompareActions({ onAddToNotebook, onAskAboutDifference }: CompareActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-block">
      <Button variant="secondary" size="small" onClick={onAddToNotebook}>
        {wording.addToNotebookLabel}
      </Button>
      <Button variant="text" size="small" onClick={onAskAboutDifference}>
        {wording.askAboutDifferenceLabel}
      </Button>
    </div>
  )
}
