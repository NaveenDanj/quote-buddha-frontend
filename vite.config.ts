import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

function fromProjectRoot(path: string): string {
  return fileURLToPath(new URL(path, import.meta.url))
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@ds': fromProjectRoot('./src/design-system'),
      '@components': fromProjectRoot('./src/components'),
      '@templates': fromProjectRoot('./src/templates'),
      '@pages': fromProjectRoot('./src/pages'),
      '@api': fromProjectRoot('./src/api'),
      '@wording': fromProjectRoot('./src/wording'),
      '@test': fromProjectRoot('./src/test'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: true,
  },
})
