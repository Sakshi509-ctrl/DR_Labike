import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    'import.meta.env.MODE': JSON.stringify('development'),
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
