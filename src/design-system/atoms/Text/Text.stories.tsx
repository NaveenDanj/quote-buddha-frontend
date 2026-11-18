import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text'

const meta = {
  title: 'Design System/Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  args: { variant: 'ui', children: 'Ask a question about the early texts' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display',
        'heading1',
        'heading2',
        'heading3',
        'toolTitle',
        'reading',
        'readingLarge',
        'readingCompact',
        'pali',
        'ui',
        'nav',
        'label',
        'caption',
        'small',
        'code',
        'codeSmall',
        'input',
        'readingInput',
      ],
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Ui: Story = {}

export const Display: Story = { args: { variant: 'display', children: 'What does the text say?' } }

export const Heading2: Story = { args: { variant: 'heading2', children: 'Evidence matrix' } }

export const Reading: Story = {
  args: {
    variant: 'reading',
    children: 'Sample sentence in the reading size, used for answers and quotations.',
  },
}

export const Pali: Story = {
  args: { variant: 'pali', children: 'Evaṃ me sutaṃ. ṃ ñ ṇ ṭ ḍ ḷ ṅ ā ī ū' },
}

export const Caption: Story = {
  args: { variant: 'caption', children: 'Translator: not recorded in source' },
}

export const Code: Story = { args: { variant: 'code', children: 'DN 1 §1.1.3' } }

export const HeadingLookOnDifferentElement: Story = {
  args: { variant: 'heading2', as: 'h3', children: 'Looks like heading 2, is a level 3 heading' },
}
