import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '@ds/atoms/Button'
import { Toast } from './Toast'

const meta = {
  title: 'Design System/Atoms/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { isOpen: true, onOpenChange: () => {}, message: 'Link copied' },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Showing: Story = {}

export const LongMessage: Story = {
  args: { message: 'Saved to your notebook. You can find it under Notes in the research panel.' },
}

function ShownByButton() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        Copy link
      </Button>
      <Toast isOpen={isOpen} onOpenChange={setIsOpen} message="Link copied" />
    </>
  )
}

export const ShownByAButton: Story = { render: () => <ShownByButton /> }
