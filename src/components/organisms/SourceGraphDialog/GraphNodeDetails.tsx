import { Text } from '@ds/atoms/Text'
import {
  GraphNodeKind,
  findSource,
  getCitationLabel,
  type Answer,
  type AnswerSource,
  type GraphNode,
  type SourceGraph,
} from '@domain'
import { removedClaimsText, wording } from '@wording'
import { ClaimList } from '@components/organisms/ClaimList'
import { SourceDetails } from '@components/organisms/SourceDetails'

type GraphNodeDetailsProps = {
  answer: Answer
  graph: SourceGraph
  selectedNode?: GraphNode
  onSelectNode: (nodeId: string) => void
  onOpenInReader?: (citationId: string) => void
}

function DetailsHeading({ children }: { children: string }) {
  return (
    <Text variant="heading3" as="h3">
      {children}
    </Text>
  )
}

type ClaimDetailsProps = {
  claimPosition: number
  answer: Answer
  graph: SourceGraph
  onSelectNode: (nodeId: string) => void
}

// Choosing the passage inside a claim moves the details to that passage.
function ClaimDetails({ claimPosition, answer, graph, onSelectNode }: ClaimDetailsProps) {
  const claim = answer.claims[claimPosition]
  if (!claim) {
    return null
  }

  function selectPassage(citationId: string) {
    const passageNode = graph.nodes.find(
      (candidate) =>
        candidate.kind === GraphNodeKind.citation && candidate.citationId === citationId,
    )
    if (passageNode) {
      onSelectNode(passageNode.id)
    }
  }

  return (
    <>
      <DetailsHeading>{wording.graphClaimLabel}</DetailsHeading>
      <ClaimList claims={[claim]} sources={answer.sources} onOpenSource={selectPassage} />
    </>
  )
}

type CitationDetailsProps = {
  source: AnswerSource | undefined
  onOpenInReader?: (citationId: string) => void
}

function CitationDetails({ source, onOpenInReader }: CitationDetailsProps) {
  if (!source) {
    return null
  }
  return (
    <>
      <DetailsHeading>{getCitationLabel(source)}</DetailsHeading>
      <SourceDetails source={source} onOpenInReader={onOpenInReader} />
    </>
  )
}

// What the box that was chosen stands for.
export function GraphNodeDetails({
  answer,
  graph,
  selectedNode,
  onSelectNode,
  onOpenInReader,
}: GraphNodeDetailsProps) {
  if (!selectedNode) {
    return (
      <Text variant="caption" as="p" className="text-text-muted">
        {wording.graphHintText}
      </Text>
    )
  }

  switch (selectedNode.kind) {
    case GraphNodeKind.citation:
      return (
        <CitationDetails
          source={findSource(answer.sources, selectedNode.citationId)}
          onOpenInReader={onOpenInReader}
        />
      )
    case GraphNodeKind.claim:
      return (
        <ClaimDetails
          claimPosition={selectedNode.claimPosition}
          answer={answer}
          graph={graph}
          onSelectNode={onSelectNode}
        />
      )
    case GraphNodeKind.removed:
      return (
        <>
          <DetailsHeading>{wording.removed}</DetailsHeading>
          <Text variant="caption" as="p" className="text-text-muted">
            {removedClaimsText(selectedNode.count)}
          </Text>
        </>
      )
    case GraphNodeKind.answer:
      return (
        <>
          <DetailsHeading>{wording.questionHeading}</DetailsHeading>
          <Text variant="reading" as="p" className="text-text">
            {selectedNode.label}
          </Text>
        </>
      )
    case GraphNodeKind.text:
      return (
        <>
          <DetailsHeading>{wording.graphTextLabel}</DetailsHeading>
          <Text variant="reading" as="p" className="text-text">
            {selectedNode.label}
          </Text>
        </>
      )
  }
}
