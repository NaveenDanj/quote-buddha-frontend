import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ComponentProps } from 'react'
import { wording } from '@wording'
import { CheckTextBox } from './CheckTextBox'

const meta = {
  title: 'Components/Molecules/CheckTextBox',
  component: CheckTextBox,
  tags: ['autodocs'],
  args: {
    label: wording.verifyTextLabel,
    placeholder: wording.verifyPlaceholder,
    value: '',
    onValueChange: () => {},
    rowCount: 3,
    scopeText: wording.verifyScope,
    buttonLabel: wording.checkQuoteLabel,
    canCheck: false,
    isChecking: false,
    onCheck: () => {},
  },
} satisfies Meta<typeof CheckTextBox>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const Filled: Story = {
  args: { value: `${wording.sampleMarker}: a quote pasted by the reader.`, canCheck: true },
}

export const Checking: Story = {
  args: { value: `${wording.sampleMarker}: a quote.`, canCheck: true, isChecking: true },
}

function TypingDemo(props: ComponentProps<typeof CheckTextBox>) {
  const [value, setValue] = useState('')
  return (
    <CheckTextBox {...props} value={value} onValueChange={setValue} canCheck={value.length > 0} />
  )
}

export const TypingEnablesTheButton: Story = {
  render: (args) => <TypingDemo {...args} />,
}
