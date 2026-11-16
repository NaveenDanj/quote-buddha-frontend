import { describe, expect, it } from 'vitest'
import {
  abstainedWeakEvidenceAnswer,
  answeredQuickAnswer,
  buildAnswer,
  buildClaim,
  buildSource,
} from '@api/fixtures'
import { EvidenceState } from './evidence'
import {
  graphBoxHeightInUnits,
  graphBoxWidthInUnits,
  layoutSourceGraph,
  type PositionedNode,
} from './graphLayout'
import { GraphNodeKind, deriveSourceGraph, removedNodeId } from './sourceGraph'

const layout = layoutSourceGraph(deriveSourceGraph(answeredQuickAnswer))

function findNodes(kind: GraphNodeKind): PositionedNode[] {
  return layout.nodes.filter((node) => node.kind === kind)
}

function findFirstNode(kind: GraphNodeKind): PositionedNode {
  const node = findNodes(kind)[0]
  if (!node) {
    throw new Error(`The graph has no ${kind} box`)
  }
  return node
}

function findNodeById(id: string): PositionedNode {
  const node = layout.nodes.find((candidate) => candidate.id === id)
  if (!node) {
    throw new Error(`The graph has no box with id ${id}`)
  }
  return node
}

describe('layoutSourceGraph', () => {
  it('puts the answer, claims, passages and texts in columns from left to right', () => {
    const answer = findFirstNode(GraphNodeKind.answer)
    const claim = findFirstNode(GraphNodeKind.claim)
    const passage = findFirstNode(GraphNodeKind.citation)
    const text = findFirstNode(GraphNodeKind.text)
    expect(answer.x).toBeLessThan(claim.x)
    expect(claim.x).toBeLessThan(passage.x)
    expect(passage.x).toBeLessThan(text.x)
  })

  it('never lets two boxes in a column touch', () => {
    for (const kind of [GraphNodeKind.claim, GraphNodeKind.citation]) {
      const column = findNodes(kind).sort((first, second) => first.y - second.y)
      for (let position = 1; position < column.length; position += 1) {
        const above = column[position - 1]
        const below = column[position]
        expect(below?.y).toBeGreaterThanOrEqual((above?.y ?? 0) + graphBoxHeightInUnits)
      }
    }
  })

  it('places a removed claim under the claims, in the claims column', () => {
    const removed = findNodeById(removedNodeId)
    expect(removed.x).toBe(findFirstNode(GraphNodeKind.claim).x)
    for (const claim of findNodes(GraphNodeKind.claim)) {
      expect(removed.y).toBeGreaterThan(claim.y)
    }
  })

  it('starts each line at the right edge of one box and ends it at the left edge of the next', () => {
    for (const edge of layout.edges) {
      expect(edge.startX).toBe(findNodeById(edge.from).x + graphBoxWidthInUnits)
      expect(edge.endX).toBe(findNodeById(edge.to).x)
    }
  })

  it('keeps every box inside the drawing', () => {
    for (const node of layout.nodes) {
      expect(node.x + graphBoxWidthInUnits).toBeLessThanOrEqual(layout.width)
      expect(node.y + graphBoxHeightInUnits).toBeLessThanOrEqual(layout.height)
      expect(node.y).toBeGreaterThanOrEqual(0)
    }
  })

  it('gives each box the state of its best-supported line', () => {
    expect(layout.nodes.map((node) => node.state)).toContain(EvidenceState.directQuote)
    expect(findNodeById(removedNodeId).state).toBe(EvidenceState.removed)
    expect(findFirstNode(GraphNodeKind.answer).state).toBeNull()
  })

  it('uses the strongest line when several lines arrive at one box', () => {
    const quoteSource = buildSource({ citationId: 'sample:1' })
    const claims = [
      buildClaim({ citationIds: ['sample:1'], quoteCitationId: 'sample:1' }),
      buildClaim({ citationIds: ['sample:1'], quoteCitationId: 'sample:other' }),
    ]
    const sharedLayout = layoutSourceGraph(
      deriveSourceGraph(buildAnswer({ claims, sources: [quoteSource] })),
    )
    const passage = sharedLayout.nodes.find((node) => node.kind === GraphNodeKind.citation)
    expect(passage?.state).toBe(EvidenceState.directQuote)
  })

  it('keeps the same four columns when some are empty', () => {
    const emptyLayout = layoutSourceGraph(deriveSourceGraph(abstainedWeakEvidenceAnswer))
    expect(emptyLayout.width).toBe(layout.width)
  })

  it('draws just the answer box when nothing was found', () => {
    const emptyLayout = layoutSourceGraph(deriveSourceGraph(abstainedWeakEvidenceAnswer))
    expect(emptyLayout.nodes).toHaveLength(1)
    expect(emptyLayout.edges).toHaveLength(0)
  })
})
