import clsx from 'clsx'
import {
  EvidenceState,
  GraphNodeKind,
  graphBoxHeightInUnits,
  graphBoxWidthInUnits,
  layoutSourceGraph,
  type PositionedEdge,
  type PositionedNode,
  type SourceGraph,
} from '@domain'
import { evidenceStateText, graphRelationText, wording } from '@wording'
import { EvidenceGlyph } from '@components/molecules/EvidenceGlyph'
import { getKindLabel, getNodeName, getNodeText } from './graphNodeText'

type LineLook = {
  strokeWidthInUnits: number
  dashPattern?: string
  className: string
}

// A solid accent line is the verified path. Dashed means not verified. Dotted means removed.
const verifiedLineWidthInUnits = 2.25
const notVerifiedDashPattern = '6 4'
const removedDashPattern = '1 5'
const strongLine = 'stroke-accent forced-colors:stroke-[CanvasText]'
const mutedLine = 'stroke-text-muted forced-colors:stroke-[CanvasText]'
const fallbackLook: LineLook = { strokeWidthInUnits: 1.5, dashPattern: '4 4', className: mutedLine }

const lineLook: Record<EvidenceState, LineLook> = {
  [EvidenceState.directQuote]: {
    strokeWidthInUnits: verifiedLineWidthInUnits,
    className: strongLine,
  },
  [EvidenceState.notVerified]: {
    strokeWidthInUnits: 1.25,
    dashPattern: notVerifiedDashPattern,
    className: mutedLine,
  },
  [EvidenceState.removed]: {
    strokeWidthInUnits: 1.5,
    dashPattern: removedDashPattern,
    className: mutedLine,
  },
  [EvidenceState.notUsed]: fallbackLook,
  [EvidenceState.notEstablished]: fallbackLook,
  [EvidenceState.notYetIncluded]: fallbackLook,
}

const weakStates: EvidenceState[] = [
  EvidenceState.notUsed,
  EvidenceState.removed,
  EvidenceState.notEstablished,
  EvidenceState.notYetIncluded,
]

// Only the question and a passage with a found quote get the heavier border.
function isHeavyBox(node: PositionedNode): boolean {
  if (node.kind === GraphNodeKind.answer) {
    return true
  }
  return node.kind === GraphNodeKind.citation && node.state === EvidenceState.directQuote
}

function getBorderWidthClass(node: PositionedNode, isSelected: boolean): string {
  if (isSelected) {
    return 'border-(length:--border-selected) forced-colors:border-8'
  }
  if (isHeavyBox(node)) {
    return 'border-(length:--border-strong) forced-colors:border-4'
  }
  return 'border-(length:--border-hairline) forced-colors:border-2'
}

// A chosen box keeps the border style of its state, so choosing a removed box never makes it look verified.
function getBoxClass(node: PositionedNode, isSelected: boolean): string {
  const isWeak = node.state !== null && weakStates.includes(node.state)

  return clsx(
    isWeak ? 'border-dashed' : 'border-solid',
    getBorderWidthClass(node, isSelected),
    isSelected && 'border-accent bg-surface-subtle',
    !isSelected && (isWeak ? 'border-text-muted' : 'border-text'),
  )
}

function getCurvePath(edge: PositionedEdge): string {
  const middleX = (edge.startX + edge.endX) / 2
  return `M ${edge.startX} ${edge.startY} C ${middleX} ${edge.startY}, ${middleX} ${edge.endY}, ${edge.endX} ${edge.endY}`
}

type GraphLinesProps = {
  edges: PositionedEdge[]
  width: number
  height: number
}

function GraphLines({ edges, width, height }: GraphLinesProps) {
  return (
    <svg aria-hidden="true" width={width} height={height} className="absolute inset-0">
      {edges.map((edge) => {
        const look = lineLook[edge.state]
        return (
          <path
            key={`${edge.from}-${edge.to}`}
            d={getCurvePath(edge)}
            fill="none"
            strokeLinecap="round"
            strokeWidth={look.strokeWidthInUnits}
            strokeDasharray={look.dashPattern}
            className={look.className}
          />
        )
      })}
    </svg>
  )
}

type GraphBoxProps = {
  node: PositionedNode
  isSelected: boolean
  onSelect: () => void
}

// The shape and the words repeat the state of the box, because the border alone is not enough.
function GraphBox({ node, isSelected, onSelect }: GraphBoxProps) {
  const stateText = node.state ? ` · ${evidenceStateText[node.state]}` : ''

  return (
    <button
      type="button"
      aria-current={isSelected ? 'true' : undefined}
      onClick={onSelect}
      style={{
        left: node.x,
        top: node.y,
        width: graphBoxWidthInUnits,
        height: graphBoxHeightInUnits,
      }}
      className={clsx(
        'absolute grid cursor-pointer content-center gap-1 overflow-hidden rounded bg-page px-3 text-left',
        getBoxClass(node, isSelected),
      )}
    >
      <span className="flex items-center gap-1 font-code text-stamp text-text-muted">
        {node.state ? <EvidenceGlyph state={node.state} /> : null}
        {`${getKindLabel(node)}${stateText}`}
      </span>
      <span className="line-clamp-2 font-ui text-caption text-text">{getNodeText(node)}</span>
    </button>
  )
}

// The same lines as the picture, written out for screen readers.
function RelationList({ edges, nodes }: { edges: PositionedEdge[]; nodes: PositionedNode[] }) {
  const nodeById = new Map(nodes.map((node) => [node.id, node]))

  return (
    <ul aria-label={wording.graphListLabel} className="sr-only">
      {edges.map((edge) => {
        const from = nodeById.get(edge.from)
        const to = nodeById.get(edge.to)
        if (!from || !to) {
          return null
        }
        return (
          <li key={`${edge.from}-${edge.to}`}>
            {graphRelationText(getNodeName(from), getNodeName(to), evidenceStateText[edge.state])}
          </li>
        )
      })}
    </ul>
  )
}

type StarGraphProps = {
  graph: SourceGraph
  selectedNodeId?: string
  onSelectNode: (nodeId: string) => void
  className?: string
}

// The lines are a picture only. The boxes are buttons, and a hidden list says every line in words.
export function StarGraph({ graph, selectedNodeId, onSelectNode, className }: StarGraphProps) {
  const layout = layoutSourceGraph(graph)

  return (
    <div
      role="region"
      aria-label={wording.sourceGraphLabel}
      className={clsx('overflow-auto rounded border border-border', className)}
    >
      {/* Positions come from the layout at run time, so they are inline styles and not tokens. */}
      <div className="relative" style={{ width: layout.width, height: layout.height }}>
        <GraphLines edges={layout.edges} width={layout.width} height={layout.height} />
        {layout.nodes.map((node) => (
          <GraphBox
            key={node.id}
            node={node}
            isSelected={node.id === selectedNodeId}
            onSelect={() => onSelectNode(node.id)}
          />
        ))}
      </div>
      <RelationList edges={layout.edges} nodes={layout.nodes} />
    </div>
  )
}
