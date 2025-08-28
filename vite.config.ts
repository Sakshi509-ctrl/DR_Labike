import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
