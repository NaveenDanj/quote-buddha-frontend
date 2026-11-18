import { Composer } from '@components/organisms/Composer'
import { doNothingYet } from '@pages/doNothingYet'
import type { useComposerDraft } from '@pages/useComposerDraft'
import { openToolFromCommand, slashCommands } from '@pages/workspaceTools'

type ConversationComposerProps = {
  draft: ReturnType<typeof useComposerDraft>
  isStreaming: boolean
  onSend: () => void
  onStop: () => void
}

export function ConversationComposer({
  draft,
  isStreaming,
  onSend,
  onStop,
}: ConversationComposerProps) {
  return (
    <Composer
      value={draft.question}
      onValueChange={draft.setQuestion}
      depth={draft.depth}
      onDepthChange={draft.setDepth}
      isStreaming={isStreaming}
      onSend={onSend}
      onStop={onStop}
      attachedFiles={draft.attachedFiles}
      onAttachFiles={draft.attachFiles}
      onRemoveFile={draft.removeFile}
      onRemoveContext={doNothingYet}
      commands={slashCommands}
      onRunCommand={(command) => {
        draft.setQuestion('')
        openToolFromCommand(command)
      }}
    />
  )
}
