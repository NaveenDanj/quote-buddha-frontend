import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta = {
  title: 'Design System/Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { glyph: 'filled', children: 'Direct quote' },
  argTypes: {
    glyph: { control: 'inline-radio', options: ['filled', 'hatched', 'dashed', 'plain'] },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Filled: Story = {}

export const Hatched: Story = { args: { glyph: 'hatched', children: 'Not verified' } }

export const Dashed: Story = { args: { glyph: 'dashed', children: 'Not established' } }

export const Plain: Story = { args: { glyph: 'plain', children: 'Deep answer' } }

export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5">
      <Tag glyph="filled">Direct quote</Tag>
      <Tag glyph="hatched">Not verified</Tag>
      <Tag glyph="dashed">Not established</Tag>
      <Tag glyph="plain">Plain</Tag>
    </div>
  ),
}
