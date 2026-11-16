import { EvidenceState } from './evidence'
import { GraphNodeKind, type GraphEdge, type GraphNode, type SourceGraph } from './sourceGraph'

// The graph is drawn in four columns, left to right: the answer, its claims, the passages, the texts.
// A removed claim sits under the claims. These sizes are in drawing units, not in CSS.
export const graphBoxWidthInUnits = 190
export const graphBoxHeightInUnits = 60
const columnGapInUnits = 70
const rowGapInUnits = 16
const edgePaddingInUnits = 16
const columnCount = 4

const columnByKind: Record<GraphNodeKind, number> = {
  [GraphNodeKind.answer]: 0,
  [GraphNodeKind.claim]: 1,
  [GraphNodeKind.removed]: 1,
  [GraphNodeKind.citation]: 2,
  [GraphNodeKind.text]: 3,
}

// From the weakest to the strongest. A box is as well supported as its best line.
const stateStrength: EvidenceState[] = [
  EvidenceState.notYetIncluded,
  EvidenceState.notEstablished,
  EvidenceState.removed,
  EvidenceState.notUsed,
  EvidenceState.notVerified,
  EvidenceState.directQuote,
]

export type PositionedNode = GraphNode & {
  x: number
  y: number
  // How well the lines that arrive at this box are supported. The answer box has no incoming line.
  state: EvidenceState | null
}

export type PositionedEdge = GraphEdge & {
  startX: number
  startY: number
  endX: number
  endY: number
}

export type GraphLayout = {
  width: number
  height: number
  nodes: PositionedNode[]
  edges: PositionedEdge[]
}

function getBetterSupportedState(first: EvidenceState, second: EvidenceState): EvidenceState {
  return stateStrength.indexOf(second) > stateStrength.indexOf(first) ? second : first
}

function getNodeState(node: GraphNode, edges: GraphEdge[]): EvidenceState | null {
  let bestState: EvidenceState | null = null

  for (const edge of edges) {
    if (edge.to !== node.id) {
      continue
    }
    bestState = bestState === null ? edge.state : getBetterSupportedState(bestState, edge.state)
  }
  return bestState
}

function groupByColumn(nodes: GraphNode[]): GraphNode[][] {
  const columns: GraphNode[][] = Array.from({ length: columnCount }, () => [])

  for (const node of nodes) {
    const column = columns[columnByKind[node.kind]]
    if (column) {
      column.push(node)
    }
  }
  return columns
}

function getColumnHeight(nodeCount: number): number {
  if (nodeCount === 0) {
    return 0
  }
  return nodeCount * graphBoxHeightInUnits + (nodeCount - 1) * rowGapInUnits
}

function positionColumn(
  column: GraphNode[],
  columnIndex: number,
  contentHeight: number,
  edges: GraphEdge[],
): PositionedNode[] {
  const columnTop = edgePaddingInUnits + (contentHeight - getColumnHeight(column.length)) / 2

  return column.map((node, row) => ({
    ...node,
    x: edgePaddingInUnits + columnIndex * (graphBoxWidthInUnits + columnGapInUnits),
    y: columnTop + row * (graphBoxHeightInUnits + rowGapInUnits),
    state: getNodeState(node, edges),
  }))
}

function positionEdges(edges: GraphEdge[], nodes: PositionedNode[]): PositionedEdge[] {
  const edgeLines: PositionedEdge[] = []
  for (const edge of edges) {
    const from = nodes.find((node) => node.id === edge.from)
    const to = nodes.find((node) => node.id === edge.to)
    if (from && to) {
      edgeLines.push({
        ...edge,
        startX: from.x + graphBoxWidthInUnits,
        startY: from.y + graphBoxHeightInUnits / 2,
        endX: to.x,
        endY: to.y + graphBoxHeightInUnits / 2,
      })
    }
  }
  return edgeLines
}

export function layoutSourceGraph(graph: SourceGraph): GraphLayout {
  const columns = groupByColumn(graph.nodes)
  const contentHeight = Math.max(...columns.map((column) => getColumnHeight(column.length)))

  const nodes = columns.flatMap((column, columnIndex) =>
    positionColumn(column, columnIndex, contentHeight, graph.edges),
  )

  return {
    width:
      edgePaddingInUnits * 2 +
      columnCount * graphBoxWidthInUnits +
      (columnCount - 1) * columnGapInUnits,
    height: edgePaddingInUnits * 2 + contentHeight,
    nodes,
    edges: positionEdges(graph.edges, nodes),
  }
}
