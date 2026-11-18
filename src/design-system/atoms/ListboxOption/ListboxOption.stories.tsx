import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListboxOption } from './ListboxOption'

const meta = {
  title: 'Design System/Atoms/ListboxOption',
  component: ListboxOption,
  tags: ['autodocs'],
  args: { isHighlighted: false, children: 'Verify a quote' },
  decorators: [
    (Story) => (
      <div role="listbox" aria-label="Sample" className="max-w-(--layout-dialog-small)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListboxOption>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Highlighted: Story = { args: { isHighlighted: true } }
