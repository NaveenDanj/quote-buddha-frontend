import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SegmentedControl } from './SegmentedControl'

const depthOptions = [
  { value: 'quick', label: 'Quick' },
  { value: 'deep', label: 'Deep' },
]

const meta = {
  title: 'Design System/Atoms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  args: { label: 'Answer depth', options: depthOptions, value: 'quick', onValueChange: () => {} },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SecondChosen: Story = { args: { value: 'deep' } }

function ChoosingExample() {
  const [value, setValue] = useState('quick')
  return (
    <SegmentedControl
      label="Answer depth"
      options={depthOptions}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const Interactive: Story = { render: () => <ChoosingExample /> }

export const WithIcons: Story = {
  args: {
    label: 'Reader view',
    value: 'both',
    options: [
      { value: 'pali', label: 'Pali', icon: 'terms' },
      { value: 'both', label: 'Both', icon: 'compare' },
      { value: 'translation', label: 'Translation', icon: 'reader' },
    ],
  },
}
