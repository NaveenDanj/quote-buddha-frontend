import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumbs } from './Breadcrumbs'

const meta = {
  title: 'Design System/Atoms/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    crumbs: [
      { label: 'Dīgha Nikāya', href: '#nikaya' },
      { label: 'DN 1', href: '#dn1' },
      { label: 'Section 1' },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OneCrumb: Story = { args: { crumbs: [{ label: 'Texts' }] } }
