import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import { useEffect } from 'react'
import { applyTheme, toThemeChoice } from '../src/design-system/tokens/theme'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'system',
  },
  decorators: [
    (Story, context) => {
      const theme = toThemeChoice(context.globals['theme'])
      useEffect(() => {
        applyTheme(theme)
      }, [theme])
      return <Story />
    },
  ],
  parameters: {
    layout: 'padded',
    // The page color comes from the theme tokens, so Storybook's own background picker is off.
    backgrounds: { disabled: true },
    viewport: {
      options: {
        phone: { name: 'Phone (400)', styles: { width: '400px', height: '800px' } },
        tablet: { name: 'Tablet (900)', styles: { width: '900px', height: '1000px' } },
        desktop: { name: 'Desktop (1280)', styles: { width: '1280px', height: '900px' } },
      },
    },
  },
}

export default preview
