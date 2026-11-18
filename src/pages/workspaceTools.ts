import type { IconName } from '@ds/atoms/Icon'
import type { SlashCommand } from '@domain'
import { wording } from '@wording'

export const ToolId = {
  reader: 'reader',
  terms: 'terms',
  compare: 'compare',
  notebook: 'notebook',
  verify: 'verify',
  checkDocument: 'checkDocument',
} as const
export type ToolId = (typeof ToolId)[keyof typeof ToolId]

type RailToolDefinition = {
  id: ToolId
  label: string
  icon: IconName
}

export const railToolDefinitions: RailToolDefinition[] = [
  { id: ToolId.reader, label: wording.navReaderLabel, icon: 'reader' },
  { id: ToolId.terms, label: wording.navTermsLabel, icon: 'terms' },
  { id: ToolId.compare, label: wording.navCompareLabel, icon: 'compare' },
  { id: ToolId.notebook, label: wording.navNotebookLabel, icon: 'notes' },
  { id: ToolId.verify, label: wording.navVerifyLabel, icon: 'verify' },
  { id: ToolId.checkDocument, label: wording.navCheckLabel, icon: 'checkDocument' },
]

type ToolCardDefinition = {
  id: ToolId
  title: string
  description: string
}

export const toolCardDefinitions: ToolCardDefinition[] = [
  { id: ToolId.verify, title: wording.toolVerifyTitle, description: wording.toolVerifyText },
  { id: ToolId.reader, title: wording.toolReaderTitle, description: wording.toolReaderText },
  { id: ToolId.terms, title: wording.toolTermsTitle, description: wording.toolTermsText },
  { id: ToolId.compare, title: wording.toolCompareTitle, description: wording.toolCompareText },
]

export const slashCommands: SlashCommand[] = toolCardDefinitions.map((tool) => ({
  id: tool.id,
  name: tool.id,
  label: tool.title,
}))

export function openTool(toolId: ToolId) {
  void toolId
}

export function openToolFromCommand(command: SlashCommand) {
  const tool = toolCardDefinitions.find((definition) => definition.id === command.id)
  if (tool) {
    openTool(tool.id)
  }
}
