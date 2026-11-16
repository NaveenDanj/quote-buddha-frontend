import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

// The Theme toolbar mirrors the app: "system" removes the attribute, so the browser setting wins.
function applyTheme(theme: string) {
  const root = document.documentElement
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme)
    return
  }
  root.removeAttribute('data-theme')
}

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
      applyTheme(String(context.globals['theme']))
      return <Story />
    },
  ],
  parameters: {
    layout: 'padded',
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
