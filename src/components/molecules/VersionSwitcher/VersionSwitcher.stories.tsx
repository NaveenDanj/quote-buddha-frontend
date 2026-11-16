import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { VersionSwitcher } from './VersionSwitcher'

const meta = {
  title: 'Components/Molecules/VersionSwitcher',
  component: VersionSwitcher,
  tags: ['autodocs'],
  args: { currentVersion: 2, versionCount: 3, onPrevious: () => {}, onNext: () => {} },
} satisfies Meta<typeof VersionSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const InTheMiddle: Story = {}

export const FirstVersion: Story = { args: { currentVersion: 1 } }

export const LastVersion: Story = { args: { currentVersion: 3 } }

export const OnlyOneVersionShowsNothing: Story = { args: { currentVersion: 1, versionCount: 1 } }

function SwitchingExample() {
  const [currentVersion, setCurrentVersion] = useState(1)
  return (
    <VersionSwitcher
      currentVersion={currentVersion}
      versionCount={3}
      onPrevious={() => setCurrentVersion(currentVersion - 1)}
      onNext={() => setCurrentVersion(currentVersion + 1)}
    />
  )
}

export const Interactive: Story = { render: () => <SwitchingExample /> }
