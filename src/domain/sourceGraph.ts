import type { Answer, AnswerSource } from './answer'
import { EvidenceState, getEvidenceStateFromLabel } from './evidence'
import { getMatrixCellState } from './evidenceMatrix'

export const GraphNodeKind = {
  answer: 'answer',
  claim: 'claim',
  citation: 'citation',
  text: 'text',
  removed: 'removed',
} as const
export type GraphNodeKind = (typeof GraphNodeKind)[keyof typeof GraphNodeKind]

export type GraphNode = {
  id: string
  kind: GraphNodeKind
  label: string
  count?: number
}

export type GraphEdge = {
  from: string
  to: string
  state: EvidenceState
}

export type SourceGraph = {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export const answerNodeId = 'answer'
export const removedNodeId = 'removed'

function getClaimNodeId(position: number): string {
  return `claim-${position}`
}

function getCitationNodeId(source: AnswerSource): string {
  return `citation-${source.citationId}`
}

function getTextNodeId(source: AnswerSource): string {
  return `text-${source.workRef}`
}

function getStrongerState(first: EvidenceState, second: EvidenceState): EvidenceState {
  if (first === EvidenceState.directQuote || second === EvidenceState.directQuote) {
    return EvidenceState.directQuote
  }
  return EvidenceState.notVerified
}

function addClaims(answer: Answer, graph: SourceGraph) {
  for (const [position, claim] of answer.claims.entries()) {
    graph.nodes.push({ id: getClaimNodeId(position), kind: GraphNodeKind.claim, label: claim.text })
    graph.edges.push({
      from: answerNodeId,
      to: getClaimNodeId(position),
      state: getEvidenceStateFromLabel(claim.evidenceLabel),
    })
  }
}

function addLinesToPassage(
  answer: Answer,
  source: AnswerSource,
  graph: SourceGraph,
): EvidenceState | null {
  let strongestState: EvidenceState | null = null

  for (const [position, claim] of answer.claims.entries()) {
    const state = getMatrixCellState(claim, source)
    if (state === EvidenceState.notUsed) {
      continue
    }
    graph.edges.push({ from: getClaimNodeId(position), to: getCitationNodeId(source), state })
    strongestState = strongestState === null ? state : getStrongerState(strongestState, state)
  }
  return strongestState
}

function addPassagesAndTexts(answer: Answer, graph: SourceGraph) {
  const addedTextIds = new Set<string>()

  for (const source of answer.sources) {
    const strongestState = addLinesToPassage(answer, source, graph)
    if (strongestState === null) {
      continue
    }

    graph.nodes.push({
      id: getCitationNodeId(source),
      kind: GraphNodeKind.citation,
      label: source.citationId,
    })
    graph.edges.push({
      from: getCitationNodeId(source),
      to: getTextNodeId(source),
      state: strongestState,
    })

    if (!addedTextIds.has(getTextNodeId(source))) {
      addedTextIds.add(getTextNodeId(source))
      graph.nodes.push({
        id: getTextNodeId(source),
        kind: GraphNodeKind.text,
        label: source.workTitle,
      })
    }
  }
}

function addRemovedClaims(answer: Answer, graph: SourceGraph) {
  if (answer.droppedClaimCount === 0) {
    return
  }
  graph.nodes.push({
    id: removedNodeId,
    kind: GraphNodeKind.removed,
    label: '',
    count: answer.droppedClaimCount,
  })
  graph.edges.push({ from: answerNodeId, to: removedNodeId, state: EvidenceState.removed })
}

export function deriveSourceGraph(answer: Answer): SourceGraph {
  const graph: SourceGraph = {
    nodes: [{ id: answerNodeId, kind: GraphNodeKind.answer, label: answer.question }],
    edges: [],
  }

  addClaims(answer, graph)
  addPassagesAndTexts(answer, graph)
  addRemovedClaims(answer, graph)
  return graph
}
