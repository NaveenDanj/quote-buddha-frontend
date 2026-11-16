import type { Meta, StoryObj } from '@storybook/react-vite'
import { Surface, SurfaceLook, SurfaceSpace } from './Surface'

const sampleContent = (
  <>
    <strong className="font-ui text-label">Sample heading</strong>
    <p className="m-0 font-reading text-ui">Sample text inside the surface.</p>
  </>
)

const meta = {
  title: 'Design System/Atoms/Surface',
  component: Surface,
  tags: ['autodocs'],
  args: {
    look: SurfaceLook.subtle,
    padding: SurfaceSpace.medium,
    gap: SurfaceSpace.small,
    children: sampleContent,
  },
  argTypes: {
    look: { control: 'select', options: Object.values(SurfaceLook) },
    padding: { control: 'inline-radio', options: Object.values(SurfaceSpace) },
    gap: { control: 'inline-radio', options: Object.values(SurfaceSpace) },
  },
} satisfies Meta<typeof Surface>

export default meta
type Story = StoryObj<typeof meta>

export const Subtle: Story = {}

export const Dashed: Story = { args: { look: SurfaceLook.dashed } }

export const Framed: Story = { args: { look: SurfaceLook.framed } }

export const Inverse: Story = { args: { look: SurfaceLook.inverse } }

export const PlainGroup: Story = { args: { look: SurfaceLook.plain, padding: SurfaceSpace.none } }

export const AllLooks: Story = {
  render: () => (
    <div className="grid max-w-(--measure-reading) gap-4">
      {Object.values(SurfaceLook).map((look) => (
        <Surface key={look} look={look} padding={SurfaceSpace.medium} gap={SurfaceSpace.small}>
          {sampleContent}
        </Surface>
      ))}
    </div>
  ),
}
