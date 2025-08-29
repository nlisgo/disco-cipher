import { defineConfig } from 'vite'

export default defineConfig({
  base: '/disco-cipher/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})