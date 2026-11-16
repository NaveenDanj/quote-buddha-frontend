import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '@ds/atoms/Button'
import { Dialog } from './Dialog'

const meta = {
  title: 'Design System/Atoms/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onOpenChange: () => {},
    title: 'Share this answer',
    children: <p className="font-ui text-ui">Sample dialog content.</p>,
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}

export const WithDescription: Story = {
  args: { description: 'Anyone with the link can read this answer and its sources.' },
}

export const Palette: Story = { args: { size: 'palette', title: 'Command palette' } }

export const Graph: Story = { args: { size: 'graph', title: 'Source graph' } }

export const LongContentScrolls: Story = {
  args: {
    children: (
      <div className="grid gap-3 font-ui text-ui">
        {Array.from({ length: 40 }, (_, position) => (
          <p key={position}>Sample line {position + 1} of a long dialog body.</p>
        ))}
      </div>
    ),
  },
}

function OpenedByButton() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen} title="Opened by a button">
        <p className="font-ui text-ui">Close it, and focus goes back to the button.</p>
      </Dialog>
    </>
  )
}

export const OpenedFromAButton: Story = { render: () => <OpenedByButton /> }
