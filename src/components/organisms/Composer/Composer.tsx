import { useId, useRef, type ChangeEvent, type KeyboardEvent, type RefObject } from 'react'
import { Chip } from '@ds/atoms/Chip'
import { IconButton, IconButtonLook } from '@ds/atoms/IconButton'
import { SegmentedControl } from '@ds/atoms/SegmentedControl'
import { Surface, SurfaceLook } from '@ds/atoms/Surface'
import { Tag } from '@ds/atoms/Tag'
import { VisuallyHidden } from '@ds/atoms/VisuallyHidden'
import { AnswerDepth, type SlashCommand } from '@domain'
import { Key } from '@keyboard'
import { removeFileText, slashMenuStatusText, wording } from '@wording'
import { ContextChip } from '@components/molecules/ContextChip'
import { FileChip } from '@components/molecules/FileChip'
import { SlashMenu, getCommandItemId } from '@components/organisms/SlashMenu'
import { useSlashMenu } from './useSlashMenu'

export type AttachedFile = {
  id: string
  name: string
}

type ComposerProps = {
  value: string
  onValueChange: (value: string) => void
  depth: AnswerDepth
  onDepthChange: (depth: AnswerDepth) => void
  isStreaming: boolean
  onSend: () => void
  onStop: () => void
  attachedFiles: AttachedFile[]
  onAttachFiles: (files: File[]) => void
  onRemoveFile: (fileId: string) => void
  // What the next question is about, when it was asked from the Reader.
  contextLabel?: string
  onRemoveContext: () => void
  commands: SlashCommand[]
  onRunCommand: (command: SlashCommand) => void
}

const promptRowCount = 2

const focusRingWhileTyping =
  'relative focus-within:outline-(length:--focus-ring-width) focus-within:outline-offset-(--focus-ring-offset) focus-within:outline-focus focus-within:outline-solid'

// On a phone keyboard the Enter key is for a new line. Sending is the Ask button.
const touchScreenQuery = '(pointer: coarse)'

const depthOptions = [
  { value: AnswerDepth.quick, label: wording.depthQuickLabel },
  { value: AnswerDepth.deep, label: wording.depthDeepLabel },
]

function toAnswerDepth(value: string): AnswerDepth {
  return value === AnswerDepth.deep ? AnswerDepth.deep : AnswerDepth.quick
}

function isSendKey(event: KeyboardEvent<HTMLTextAreaElement>): boolean {
  if (event.key !== Key.enter || event.shiftKey || event.nativeEvent.isComposing) {
    return false
  }
  return !window.matchMedia(touchScreenQuery).matches
}

// What a screen reader is told about the box itself, as the menu opens or the answer starts.
function getStatusText(isMenuOpen: boolean, commandCount: number, isStreaming: boolean): string {
  if (isMenuOpen) {
    return slashMenuStatusText(commandCount)
  }
  return isStreaming ? wording.answerWritingText : ''
}

type PromptBoxProps = {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  value: string
  onValueChange: (value: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  isMenuOpen: boolean
  listId: string
  hintId: string
  highlightedId?: string
}

// A plain multi-line text box. While the slash menu is open it points at the lit row without losing the focus.
function PromptBox({
  textareaRef,
  value,
  onValueChange,
  onKeyDown,
  isMenuOpen,
  listId,
  hintId,
  highlightedId,
}: PromptBoxProps) {
  return (
    <label>
      <VisuallyHidden>{wording.composerLabel}</VisuallyHidden>
      <textarea
        ref={textareaRef}
        value={value}
        rows={promptRowCount}
        placeholder={wording.composerPlaceholder}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={onKeyDown}
        aria-describedby={hintId}
        aria-autocomplete="list"
        aria-controls={isMenuOpen ? listId : undefined}
        aria-activedescendant={highlightedId}
        className="w-full resize-none border-0 bg-transparent px-card pt-card-tight pb-group font-reading text-input text-text placeholder:text-text-muted focus-visible:outline-0"
      />
    </label>
  )
}

type AttachmentChipsProps = Pick<ComposerProps, 'attachedFiles' | 'contextLabel'> & {
  promptRef: RefObject<HTMLTextAreaElement | null>
  onRemoveFile: (fileId: string) => void
  onRemoveContext: () => void
}

// The chip that is removed was the focused one, so focus goes back to the text box.
function AttachmentChips({
  attachedFiles,
  contextLabel,
  promptRef,
  onRemoveFile,
  onRemoveContext,
}: AttachmentChipsProps) {
  function removeFile(fileId: string) {
    onRemoveFile(fileId)
    promptRef.current?.focus()
  }

  function removeContext() {
    onRemoveContext()
    promptRef.current?.focus()
  }

  return (
    <div className="flex flex-wrap items-center gap-group px-card">
      {contextLabel ? (
        <ContextChip
          label={contextLabel}
          removeLabel={wording.removeContextLabel}
          onRemove={removeContext}
        />
      ) : null}
      {attachedFiles.map((file) => (
        <FileChip
          key={file.id}
          fileName={file.name}
          removeLabel={removeFileText(file.name)}
          onRemove={() => removeFile(file.id)}
        />
      ))}
    </div>
  )
}

type OptionsRowProps = Pick<
  ComposerProps,
  'depth' | 'onDepthChange' | 'isStreaming' | 'onSend' | 'onStop' | 'onAttachFiles'
> & {
  canSend: boolean
}

// Depth, where to search, attach, and the one button that sends and then turns into stop.
function OptionsRow({
  depth,
  onDepthChange,
  isStreaming,
  onSend,
  onStop,
  onAttachFiles,
  canSend,
}: OptionsRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function onFilesChosen(event: ChangeEvent<HTMLInputElement>) {
    onAttachFiles(Array.from(event.target.files ?? []))
    event.target.value = ''
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-group pt-group pr-card-tight pb-card-tight pl-card">
      <div className="flex flex-wrap items-center gap-group">
        <SegmentedControl
          label={wording.depthLabel}
          options={depthOptions}
          value={depth}
          onValueChange={(next) => onDepthChange(toAnswerDepth(next))}
        />
        <Tag>{wording.earlyTextsLabel}</Tag>
        <Chip unavailableReason={wording.notYetIncluded}>{wording.commentariesLabel}</Chip>
        <IconButton
          icon="attach"
          label={wording.attachLabel}
          onClick={() => fileInputRef.current?.click()}
        />
        <input ref={fileInputRef} type="file" multiple hidden onChange={onFilesChosen} />
      </div>
      {isStreaming ? (
        <IconButton
          icon="stop"
          label={wording.stopLabel}
          look={IconButtonLook.solid}
          onClick={onStop}
        />
      ) : (
        <IconButton
          icon="send"
          label={wording.askLabel}
          look={IconButtonLook.solid}
          aria-disabled={canSend ? undefined : true}
          onClick={canSend ? onSend : undefined}
        />
      )}
    </div>
  )
}

type ScreenReaderLinesProps = {
  hintId: string
  statusText: string
}

// A hint that describes the text box, and a status line that says when the menu opens or an answer starts.
function ScreenReaderLines({ hintId, statusText }: ScreenReaderLinesProps) {
  return (
    <>
      <VisuallyHidden>
        <span id={hintId}>{wording.composerHintText}</span>
      </VisuallyHidden>
      <p role="status" className="sr-only">
        {statusText}
      </p>
    </>
  )
}

type ComposerKeysOptions = {
  slashMenu: ReturnType<typeof useSlashMenu>
  canSend: boolean
  isStreaming: boolean
  onSend: () => void
}

// Enter sends. Shift and Enter adds a new line. While the slash menu is open it takes the keys first.
function useComposerKeys({ slashMenu, canSend, isStreaming, onSend }: ComposerKeysOptions) {
  return function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (slashMenu.handleKey(event) || !isSendKey(event)) {
      return
    }
    event.preventDefault()
    if (canSend && !isStreaming) {
      onSend()
    }
  }
}

export function Composer(props: ComposerProps) {
  const { value, onValueChange, isStreaming, onSend } = props
  const listId = useId()
  const hintId = useId()
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const slashMenu = useSlashMenu({
    value,
    commands: props.commands,
    onRunCommand: props.onRunCommand,
  })
  const canSend = value.trim().length > 0

  const onKeyDown = useComposerKeys({ slashMenu, canSend, isStreaming, onSend })

  const highlightedId = slashMenu.highlightedCommand
    ? getCommandItemId(listId, slashMenu.highlightedCommand)
    : undefined

  return (
    <Surface look={SurfaceLook.outlined} className={focusRingWhileTyping}>
      {slashMenu.isOpen ? (
        <SlashMenu
          listId={listId}
          commands={slashMenu.matches}
          highlightedId={highlightedId}
          onChoose={props.onRunCommand}
        />
      ) : null}
      <PromptBox
        textareaRef={promptRef}
        value={value}
        onValueChange={onValueChange}
        onKeyDown={onKeyDown}
        isMenuOpen={slashMenu.isOpen}
        listId={listId}
        hintId={hintId}
        highlightedId={highlightedId}
      />
      <ScreenReaderLines
        hintId={hintId}
        statusText={getStatusText(slashMenu.isOpen, slashMenu.matches.length, isStreaming)}
      />
      <AttachmentChips
        attachedFiles={props.attachedFiles}
        contextLabel={props.contextLabel}
        promptRef={promptRef}
        onRemoveFile={props.onRemoveFile}
        onRemoveContext={props.onRemoveContext}
      />
      <OptionsRow
        depth={props.depth}
        onDepthChange={props.onDepthChange}
        isStreaming={isStreaming}
        onSend={onSend}
        onStop={props.onStop}
        onAttachFiles={props.onAttachFiles}
        canSend={canSend}
      />
    </Surface>
  )
}
