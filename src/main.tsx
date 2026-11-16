import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { applyTheme, readSavedTheme } from './design-system/tokens/theme'
import './index.css'

// Apply the saved theme before the first paint so the page does not flash the wrong colors.
applyTheme(readSavedTheme())

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('The page has no element with id "root".')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
