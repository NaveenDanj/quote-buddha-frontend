import type { Meta, StoryObj } from '@storybook/react-vite'
import { Meter } from './Meter'

const meta = {
  title: 'Design System/Atoms/Meter',
  component: Meter,
  tags: ['autodocs'],
  args: { value: 40, max: 100, label: 'Passages checked' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 5 } },
  },
} satisfies Meta<typeof Meter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = { args: { value: 0 } }

export const Full: Story = { args: { value: 100 } }

export const WithWrittenValue: Story = {
  render: (args) => (
    <div className="grid max-w-(--layout-panel) gap-2 font-ui text-caption text-text-muted">
      <Meter {...args} />
      <span>2 of 5 passages checked</span>
    </div>
  ),
  args: { value: 2, max: 5 },
}
