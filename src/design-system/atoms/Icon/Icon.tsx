import clsx from 'clsx'
import {
  ArrowUp,
  BookOpen,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Copy,
  Download,
  Ellipsis,
  FileCheck,
  Flag,
  Grid3x3,
  Link,
  Menu,
  MessageSquare,
  Network,
  NotebookPen,
  PanelLeft,
  PanelRight,
  Paperclip,
  Pencil,
  Plus,
  Quote,
  RefreshCw,
  Search,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Square,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Type,
  X,
  type LucideIcon,
} from 'lucide-react'

// The names say what the icon means, not what it looks like. This is the only place that knows lucide.
const icons = {
  close: X,
  copy: Copy,
  cite: Quote,
  regenerate: RefreshCw,
  saveToNotebook: Bookmark,
  notes: NotebookPen,
  evidenceMatrix: Grid3x3,
  sourceGraph: Network,
  reader: BookOpen,
  search: Search,
  share: Share2,
  download: Download,
  link: Link,
  settings: SlidersHorizontal,
  menu: Menu,
  add: Plus,
  send: ArrowUp,
  stop: Square,
  attach: Paperclip,
  edit: Pencil,
  previous: ChevronLeft,
  next: ChevronRight,
  expand: ChevronDown,
  helpful: ThumbsUp,
  notHelpful: ThumbsDown,
  report: Flag,
  more: Ellipsis,
  researchPanel: PanelRight,
  sectionsList: PanelLeft,
  compare: Columns2,
  terms: Type,
  verify: ShieldCheck,
  checkDocument: FileCheck,
  ai: Sparkles,
  ask: MessageSquare,
  delete: Trash2,
  done: Check,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]

type IconSize = 'small' | 'medium' | 'large'

const sizeClass: Record<IconSize, string> = {
  small: 'size-(--icon-small)',
  medium: 'size-(--icon-medium)',
  large: 'size-(--icon-large)',
}

type IconProps = {
  name: IconName
  size?: IconSize
  // Leave out for decoration (the usual case: the text or button label says it already).
  label?: string
  className?: string
}

export function Icon({ name, size = 'medium', label, className }: IconProps) {
  const Drawing = icons[name]
  const isDecoration = label === undefined

  return (
    <Drawing
      className={clsx('shrink-0', sizeClass[size], className)}
      style={{ strokeWidth: 'var(--icon-stroke)' }}
      aria-hidden={isDecoration ? true : undefined}
      aria-label={label}
      role={isDecoration ? undefined : 'img'}
    />
  )
}
