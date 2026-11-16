import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field } from './Field'

const meta = {
  title: 'Design System/Atoms/Field',
  component: Field,
  tags: ['autodocs'],
  args: { controlId: 'sample', label: 'Email', children: null },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

function SampleControl() {
  return (
    <input
      id="sample"
      className="h-(--control-send) rounded border border-text-muted bg-page px-3 font-ui text-input"
    />
  )
}

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <SampleControl />
    </Field>
  ),
}

export const WithHint: Story = {
  render: (args) => (
    <Field {...args} hint="We only use it to send the share link.">
      <SampleControl />
    </Field>
  ),
}

export const WithError: Story = {
  render: (args) => (
    <Field {...args} errorText="Enter an email address.">
      <SampleControl />
    </Field>
  ),
}

export const LabelHidden: Story = {
  render: (args) => (
    <Field {...args} isLabelHidden>
      <SampleControl />
    </Field>
  ),
}
