import type { Meta, StoryObj } from '@storybook/react-vite'
import { FactList } from './FactList'

const meta = {
  title: 'Design System/Atoms/FactList',
  component: FactList,
  tags: ['autodocs'],
  args: {
    facts: [
      { label: 'Edition', value: 'Sample edition' },
      { label: 'Translator', value: 'Not recorded in source' },
      {
        label: 'Checksum',
        value: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
      },
    ],
  },
} satisfies Meta<typeof FactList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongValueWraps: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-panel)">
        <Story />
      </div>
    ),
  ],
}
