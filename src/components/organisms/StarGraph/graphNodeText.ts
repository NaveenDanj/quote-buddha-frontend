import { GraphNodeKind, type GraphNode } from '@domain'
import { wording } from '@wording'

export function getKindLabel(node: GraphNode): string {
  switch (node.kind) {
    case GraphNodeKind.answer:
      return wording.questionHeading
    case GraphNodeKind.claim:
      return wording.graphClaimLabel
    case GraphNodeKind.citation:
      return wording.graphPassageLabel
    case GraphNodeKind.text:
      return wording.graphTextLabel
    case GraphNodeKind.removed:
      return wording.removed
  }
}

export function getNodeText(node: GraphNode): string {
  return node.kind === GraphNodeKind.removed ? String(node.count) : node.label
}

// The name a screen reader hears, for example "Passage: Sample work · 44.5".
export function getNodeName(node: GraphNode): string {
  return `${getKindLabel(node)}: ${getNodeText(node)}`
}
