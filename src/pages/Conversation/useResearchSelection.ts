import { useState } from 'react'
import { getAnswerFromStream, type Answer, type Turn } from '@domain'
import { ResearchTab } from '@components/organisms/ResearchPanel'

type Selection = {
  turnId: string
  tab: ResearchTab
  citationId?: string
}

// Which answer the research panel and the source graph are showing, and what they show of it.
export function useResearchSelection(turns: Turn[]) {
  const [selection, setSelection] = useState<Selection | undefined>(undefined)
  const [isGraphOpen, setIsGraphOpen] = useState(false)

  const selectedTurn = turns.find((turn) => turn.id === selection?.turnId)
  const answer: Answer | undefined = selectedTurn && getAnswerFromStream(selectedTurn.state)

  function showSource(turnId: string, citationId: string) {
    setSelection({ turnId, tab: ResearchTab.sources, citationId })
  }

  function showEvidence(turnId: string) {
    setSelection({ turnId, tab: ResearchTab.evidence })
  }

  function openGraph(turnId: string) {
    setSelection({ turnId, tab: selection?.tab ?? ResearchTab.evidence })
    setIsGraphOpen(true)
  }

  function changeTab(tab: ResearchTab) {
    if (selection) {
      setSelection({ ...selection, tab })
    }
  }

  function closePanel() {
    setSelection(undefined)
  }

  // With no answer chosen yet, the button opens the latest one that has an answer.
  function togglePanel() {
    if (selection) {
      closePanel()
      return
    }
    const latestAnsweredTurn = turns.findLast((turn) => getAnswerFromStream(turn.state))
    if (latestAnsweredTurn) {
      showEvidence(latestAnsweredTurn.id)
    }
  }

  const isPanelOpen = answer !== undefined && selection !== undefined

  return {
    answer,
    isPanelOpen,
    selection,
    isGraphOpen,
    setIsGraphOpen,
    showSource,
    showEvidence,
    openGraph,
    changeTab,
    closePanel,
    togglePanel,
  }
}
