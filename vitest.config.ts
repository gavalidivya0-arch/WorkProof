import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['tests/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
})
