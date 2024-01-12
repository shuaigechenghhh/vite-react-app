import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

  ],
  server:{ //主要是加上这段代码
    host: 'localhost',
    port: 5173,
    proxy: {
      '/go': {
        target: 'http://localhost:9999',	//实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/go/, '')
      },
    }
  }
})
