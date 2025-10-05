// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chat': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
    },
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.dev', // thêm host ngrok vào đây
    ],
  },
  css: {
    devSourcemap: true,
  },
})

