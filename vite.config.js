import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
     coverage: {
      provider: 'v8', // or 'c8'
      reporter: ['text', 'json', 'html'], // generates detailed reports
    },
  },
})
