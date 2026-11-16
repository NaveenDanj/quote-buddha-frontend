import type { Meta, StoryObj } from '@storybook/react-vite'
import { CoverageStrip } from './CoverageStrip'

const meta = {
  title: 'Components/Molecules/CoverageStrip',
  component: CoverageStrip,
  tags: ['autodocs'],
  args: {
    title: 'Sample collection',
    summary: '1 of 34 sample texts',
    includedCount: 1,
    totalCount: 34,
  },
} satisfies Meta<typeof CoverageStrip>

export default meta
type Story = StoryObj<typeof meta>

export const OneIncluded: Story = {}

export const NoneIncluded: Story = { args: { summary: '0 of 34 sample texts', includedCount: 0 } }

export const AllIncluded: Story = {
  args: { summary: '34 of 34 sample texts', includedCount: 34 },
}

export const ManyTexts: Story = {
  args: { summary: '12 of 152 sample texts', includedCount: 12, totalCount: 152 },
}
