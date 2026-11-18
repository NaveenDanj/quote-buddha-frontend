import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ComponentProps } from 'react'
import { DocumentCheckForm } from './DocumentCheckForm'

const meta = {
  title: 'Components/Organisms/DocumentCheckForm',
  component: DocumentCheckForm,
  tags: ['autodocs'],
  args: {
    pastedText: '',
    onPastedTextChange: () => {},
    onFileChosen: () => {},
    canCheck: false,
    isChecking: false,
    onCheck: () => {},
  },
} satisfies Meta<typeof DocumentCheckForm>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithPastedText: Story = {
  args: { pastedText: 'Layout sample: a paragraph with a “sample saying”.', canCheck: true },
}

export const WithChosenFile: Story = {
  args: { chosenFileName: 'essay.pdf', canCheck: true },
}

export const Checking: Story = {
  args: { pastedText: 'Layout sample paragraph.', canCheck: true, isChecking: true },
}

function TypingDemo(props: ComponentProps<typeof DocumentCheckForm>) {
  const [pastedText, setPastedText] = useState('')
  return (
    <DocumentCheckForm
      {...props}
      pastedText={pastedText}
      onPastedTextChange={setPastedText}
      canCheck={pastedText.length > 0}
    />
  )
}

export const TypingEnablesTheButton: Story = {
  render: (args) => <TypingDemo {...args} />,
}
