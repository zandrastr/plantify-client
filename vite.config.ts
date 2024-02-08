import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
  },
  build: {
    assetsInlineLimit: 0, 
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
