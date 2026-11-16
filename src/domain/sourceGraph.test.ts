import { describe, expect, it } from 'vitest'
import {
  abstainedWeakEvidenceAnswer,
  answeredQuickAnswer,
  buildAnswer,
  buildClaim,
  buildSource,
} from '@api/fixtures'
import { EvidenceState } from './evidence'
import { GraphNodeKind, answerNodeId, deriveSourceGraph, removedNodeId } from './sourceGraph'

function countNodes(kind: GraphNodeKind, nodes: { kind: GraphNodeKind }[]): number {
  return nodes.filter((node) => node.kind === kind).length
}

describe('deriveSourceGraph', () => {
  it('draws the answer, its claims, the passages they cite and the text', () => {
    const { nodes } = deriveSourceGraph(answeredQuickAnswer)
    expect(countNodes(GraphNodeKind.answer, nodes)).toBe(1)
    expect(countNodes(GraphNodeKind.claim, nodes)).toBe(2)
    expect(countNodes(GraphNodeKind.citation, nodes)).toBe(2)
    expect(countNodes(GraphNodeKind.text, nodes)).toBe(1)
  })

  it('leaves out a retrieved passage that no claim used', () => {
    const { nodes } = deriveSourceGraph(answeredQuickAnswer)
    expect(nodes.map((node) => node.label)).not.toContain('sample:dn-1:3')
  })

  it('shows a removed claim as one dashed node, never as an answer', () => {
    const { nodes, edges } = deriveSourceGraph(answeredQuickAnswer)
    const removedNode = nodes.find((node) => node.id === removedNodeId)
    expect(removedNode?.kind === GraphNodeKind.removed && removedNode.count).toBe(1)
    expect(edges.find((edge) => edge.to === removedNodeId)?.state).toBe(EvidenceState.removed)
  })

  it('has no removed node when nothing was removed', () => {
    const { nodes } = deriveSourceGraph(abstainedWeakEvidenceAnswer)
    expect(countNodes(GraphNodeKind.removed, nodes)).toBe(0)
  })

  it('is only the answer for an abstained answer with no claims', () => {
    const { nodes, edges } = deriveSourceGraph(abstainedWeakEvidenceAnswer)
    expect(nodes.map((node) => node.id)).toEqual([answerNodeId])
    expect(edges).toHaveLength(0)
  })

  it('draws a solid line only where the quote was found', () => {
    const quoteSource = buildSource({ citationId: 'sample:1' })
    const claim = buildClaim({ citationIds: ['sample:1'], quoteCitationId: 'sample:1' })
    const { edges } = deriveSourceGraph(buildAnswer({ claims: [claim], sources: [quoteSource] }))
    const citationEdge = edges.find((edge) => edge.to.startsWith('citation-'))
    expect(citationEdge?.state).toBe(EvidenceState.directQuote)
  })
})
