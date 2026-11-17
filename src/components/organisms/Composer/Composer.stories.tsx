import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { AnswerDepth } from '@domain'
import { wording } from '@wording'
import { Composer } from './Composer'

const commands = [
  { id: 'verify', name: 'verify', label: wording.navVerifyLabel },
  { id: 'reader', name: 'reader', label: wording.navReaderLabel },
  { id: 'terms', name: 'terms', label: wording.navTermsLabel },
]

const meta = {
  title: 'Components/Organisms/Composer',
  component: Composer,
  tags: ['autodocs'],
  args: {
    value: '',
    onValueChange: () => {},
    depth: AnswerDepth.quick,
    onDepthChange: () => {},
    isStreaming: false,
    onSend: () => {},
    onStop: () => {},
    attachedFiles: [],
    onAttachFiles: () => {},
    onRemoveFile: () => {},
    onRemoveContext: () => {},
    commands,
    onRunCommand: () => {},
  },
  decorators: [
    (Story) => (
      <div className="mt-40 max-w-(--layout-composer)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Composer>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithAQuestion: Story = { args: { value: `${wording.sampleMarker}: a question?` } }

export const DeepResearch: Story = { args: { depth: AnswerDepth.deep } }

export const Streaming: Story = {
  args: { value: `${wording.sampleMarker}: a question?`, isStreaming: true },
}

export const SlashMenuOpen: Story = { args: { value: '/' } }

export const WithAFileAndAContext: Story = {
  args: {
    attachedFiles: [{ id: '1', name: 'sample-notes.pdf' }],
    contextLabel: 'On sample section 5.2',
  },
}

export const LongFileNameWraps: Story = {
  args: {
    attachedFiles: [
      { id: '1', name: 'a-very-long-sample-file-name-that-keeps-going-and-going-and-going.pdf' },
    ],
  },
  parameters: { viewport: { defaultViewport: 'phone' } },
}

export const LongQuestionScrolls: Story = {
  args: { value: `${wording.sampleMarker}: ${'a very long question that goes on '.repeat(20)}?` },
}

function TypingExample() {
  const [value, setValue] = useState('')
  const [depth, setDepth] = useState<AnswerDepth>(AnswerDepth.quick)
  const [isStreaming, setIsStreaming] = useState(false)

  return (
    <Composer
      {...meta.args}
      value={value}
      onValueChange={setValue}
      depth={depth}
      onDepthChange={setDepth}
      isStreaming={isStreaming}
      onSend={() => setIsStreaming(true)}
      onStop={() => setIsStreaming(false)}
      onRunCommand={() => setValue('')}
    />
  )
}

export const Interactive: Story = { render: () => <TypingExample /> }
