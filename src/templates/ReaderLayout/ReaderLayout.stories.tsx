import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { ReaderLayout } from './ReaderLayout'

function SampleLines({ count }: { count: number }) {
  const lines = Array.from({ length: count }, (_, index) => index + 1)
  return (
    <>
      {lines.map((line) => (
        <Text key={line} variant="ui" as="p">
          {`${wording.sampleMarker}: line ${line}`}
        </Text>
      ))}
    </>
  )
}

const meta = {
  title: 'Templates/ReaderLayout',
  component: ReaderLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    toolbar: <div className="border-b border-border p-card">{wording.sampleMarker}: toolbar</div>,
    outline: <SampleLines count={6} />,
    isOutlineOpen: true,
    side: <SampleLines count={8} />,
    isSideOpen: true,
    askBar: <div className="border-t border-border p-card">{wording.sampleMarker}: ask bar</div>,
    scrollResetKey: 'first',
    children: <SampleLines count={60} />,
  },
  decorators: [
    (Story) => (
      <div className="grid h-dvh">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReaderLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OutlineClosed: Story = { args: { isOutlineOpen: false } }

export const SideClosed: Story = { args: { isSideOpen: false } }
