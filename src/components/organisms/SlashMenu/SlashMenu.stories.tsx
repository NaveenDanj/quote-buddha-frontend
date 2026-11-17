import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { SlashMenu, getCommandItemId } from './SlashMenu'

const verifyCommand = { id: 'verify', name: 'verify', label: wording.navVerifyLabel }
const readerCommand = { id: 'reader', name: 'reader', label: wording.navReaderLabel }
const termsCommand = {
  id: 'terms',
  name: 'terms',
  label: wording.navTermsLabel,
  shortcut: 'Ctrl T',
}
const listId = 'slash-sample'

const meta = {
  title: 'Components/Organisms/SlashMenu',
  component: SlashMenu,
  tags: ['autodocs'],
  args: { listId, commands: [verifyCommand, readerCommand, termsCommand], onChoose: () => {} },
  decorators: [
    (Story) => (
      <div className="relative mt-32 max-w-(--layout-composer)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SlashMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SecondHighlighted: Story = {
  args: { highlightedId: getCommandItemId(listId, readerCommand) },
}
