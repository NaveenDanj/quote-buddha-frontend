import type { RailTool } from '@components/organisms/Rail'
import { openTool, railToolDefinitions, type ToolId } from '@pages/workspaceTools'

// A tool with a page opens that page. The others do nothing yet.
export function getRailTools(
  currentToolId: ToolId | undefined,
  goTo: (path: string) => void,
): RailTool[] {
  return railToolDefinitions.map((tool) => ({
    ...tool,
    isCurrent: tool.id === currentToolId,
    onOpen: () => openTool(tool.id, goTo),
  }))
}
