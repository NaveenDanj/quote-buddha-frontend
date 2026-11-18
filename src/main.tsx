import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { applyReadingSize, readSavedReadingSize } from '@ds/tokens/readingSize'
import { applyTheme, readSavedTheme } from '@ds/tokens/theme'
import './index.css'

// Apply the saved theme before the first paint so the page does not flash the wrong colors.
applyTheme(readSavedTheme())
applyReadingSize(readSavedReadingSize())

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('The page has no element with id "root".')
}

const appRoot = createRoot(rootElement)

// The backend has no /ask yet, so while developing, a mock answers it with the sample answer.
async function startMockBackend() {
  const { worker } = await import('@api/mocks/browser')
  await worker.start({ onUnhandledFrame: 'bypass' })
}

async function startApp() {
  if (import.meta.env.DEV) {
    await startMockBackend()
  }
  appRoot.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

startApp()
