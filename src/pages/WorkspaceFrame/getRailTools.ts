import type { RailTool } from '@components/organisms/Rail'
import { getToolPath, openTool, railToolDefinitions, type ToolId } from '@pages/workspaceTools'

// A tool with a page opens that page. The others do nothing yet.
export function getRailTools(
  currentToolId: ToolId | undefined,
  goTo: (path: string) => void,
): RailTool[] {
  function openToolPage(toolId: ToolId) {
    const path = getToolPath(toolId)
    if (path) {
      goTo(path)
    } else {
      openTool(toolId)
    }
  }

  return railToolDefinitions.map((tool) => ({
    ...tool,
    isCurrent: tool.id === currentToolId,
    onOpen: () => openToolPage(tool.id),
  }))
}
