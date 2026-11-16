import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, iconNames } from './Icon'

const meta = {
  title: 'Design System/Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'search', size: 'medium' },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = { args: { size: 'small' } }

export const Large: Story = { args: { size: 'large' } }

export const WithLabel: Story = { args: { name: 'verify', label: 'Verified' } }

export const AllIcons: Story = {
  render: () => (
    <ul className="grid grid-cols-2 gap-4 font-ui text-ui sm:grid-cols-4">
      {iconNames.map((name) => (
        <li key={name} className="flex items-center gap-3">
          <Icon name={name} size="large" />
          <span className="font-code text-code">{name}</span>
        </li>
      ))}
    </ul>
  ),
}
