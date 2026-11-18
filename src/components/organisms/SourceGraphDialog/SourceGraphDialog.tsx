import { useRef, useState } from 'react'
import { Dialog } from '@ds/atoms/Dialog'
import { EvidenceState, deriveSourceGraph, type Answer } from '@domain'
import { graphShowingText, wording } from '@wording'
import { Legend } from '@components/molecules/Legend'
import { StarGraph, getNodeName } from '@components/organisms/StarGraph'
import { GraphNodeDetails } from './GraphNodeDetails'

type SourceGraphDialogProps = {
  answer: Answer
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onOpenInReader?: (citationId: string) => void
}

const legendStates = [EvidenceState.directQuote, EvidenceState.notVerified, EvidenceState.removed]

// The graph on the left, and the details of the chosen box on the right.
export function SourceGraphDialog({
  answer,
  isOpen,
  onOpenChange,
  onOpenInReader,
}: SourceGraphDialogProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(undefined)
  const detailsRef = useRef<HTMLDivElement>(null)
  const graph = deriveSourceGraph(answer)
  const selectedNode = graph.nodes.find((node) => node.id === selectedNodeId)

  function changeOpen(nextIsOpen: boolean) {
    if (!nextIsOpen) {
      setSelectedNodeId(undefined)
    }
    onOpenChange(nextIsOpen)
  }

  // A choice made inside the details removes the button that was chosen, so focus moves to the details.
  function selectFromDetails(nodeId: string) {
    setSelectedNodeId(nodeId)
    detailsRef.current?.focus()
  }

  return (
    <Dialog isOpen={isOpen} onOpenChange={changeOpen} title={wording.sourceGraphLabel} size="graph">
      <div className="grid gap-page md:h-(--layout-graph-height) md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="grid min-h-0 gap-block md:grid-rows-[minmax(0,1fr)_auto]">
          <StarGraph
            graph={graph}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            className="min-h-0"
          />
          <Legend label={wording.evidenceKeyLabel} states={legendStates} />
        </div>
        <div
          ref={detailsRef}
          role="region"
          aria-label={wording.graphDetailsLabel}
          tabIndex={0}
          className="grid min-h-0 content-start gap-block overflow-y-auto md:border-l md:border-border md:pl-page"
        >
          <p role="status" className="sr-only">
            {selectedNode ? graphShowingText(getNodeName(selectedNode)) : ''}
          </p>
          <GraphNodeDetails
            answer={answer}
            graph={graph}
            selectedNode={selectedNode}
            onSelectNode={selectFromDetails}
            onOpenInReader={onOpenInReader}
          />
        </div>
      </div>
    </Dialog>
  )
}
