import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { ToolPageHeading } from './ToolPageHeading'

const meta = {
  title: 'Components/Molecules/ToolPageHeading',
  component: ToolPageHeading,
  tags: ['autodocs'],
  args: { title: wording.navVerifyLabel, intro: wording.verifyPageIntro },
} satisfies Meta<typeof ToolPageHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
