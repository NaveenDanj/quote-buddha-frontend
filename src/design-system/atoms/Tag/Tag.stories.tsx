import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, TagGlyph } from './Tag'

const meta = {
  title: 'Design System/Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { glyph: TagGlyph.filled, children: 'Direct quote' },
  argTypes: {
    glyph: { control: 'inline-radio', options: Object.values(TagGlyph) },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Filled: Story = {}

export const Hatched: Story = { args: { glyph: TagGlyph.hatched, children: 'Not verified' } }

export const Dashed: Story = { args: { glyph: TagGlyph.dashed, children: 'Not established' } }

export const Plain: Story = { args: { glyph: TagGlyph.plain, children: 'Deep answer' } }

export const AllShapes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5">
      <Tag glyph={TagGlyph.filled}>Direct quote</Tag>
      <Tag glyph={TagGlyph.hatched}>Not verified</Tag>
      <Tag glyph={TagGlyph.dashed}>Not established</Tag>
      <Tag glyph={TagGlyph.plain}>Plain</Tag>
    </div>
  ),
}
