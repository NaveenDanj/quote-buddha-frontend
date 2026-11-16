import type { Meta, StoryObj } from '@storybook/react-vite'
import { GlyphShape, GlyphSquare } from './GlyphSquare'

const meta = {
  title: 'Design System/Atoms/GlyphSquare',
  component: GlyphSquare,
  tags: ['autodocs'],
  args: { shape: GlyphShape.filled },
  argTypes: {
    shape: { control: 'inline-radio', options: Object.values(GlyphShape) },
  },
} satisfies Meta<typeof GlyphSquare>

export default meta
type Story = StoryObj<typeof meta>

export const Filled: Story = {}

export const Hatched: Story = { args: { shape: GlyphShape.hatched } }

export const Dashed: Story = { args: { shape: GlyphShape.dashed } }

export const AllShapes: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-text">
      <GlyphSquare shape={GlyphShape.filled} />
      <GlyphSquare shape={GlyphShape.hatched} />
      <GlyphSquare shape={GlyphShape.dashed} />
    </div>
  ),
}
