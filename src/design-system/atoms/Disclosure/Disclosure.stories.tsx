import type { Meta, StoryObj } from '@storybook/react-vite'
import { Disclosure } from './Disclosure'

const meta = {
  title: 'Design System/Atoms/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  args: {
    summary: 'How was this answer made?',
    children: 'Sample explanation text that appears when the section is open.',
  },
} satisfies Meta<typeof Disclosure>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {}

export const Open: Story = { args: { isOpenAtStart: true } }

export const Several: Story = {
  render: () => (
    <div className="max-w-(--measure-reading)">
      <Disclosure summary="Edition and translator">Sample details.</Disclosure>
      <Disclosure summary="Checksum">Sample details.</Disclosure>
    </div>
  ),
}
