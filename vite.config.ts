import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_API_URL ?? 'http://localhost:3002'

  return {
    plugins: [react()],
    server: {
      proxy: {
        // /api/* → ai-exec-board backend (agent registry, read-only)
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // /local/* → local-api in dev, or API Gateway URL in production builds with preview
        '/local': {
          target: 'http://localhost:3002',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/local/, ''),
        },
      },
    },
    define: {
      // Expose API URL to runtime so fetch calls can target the right backend
      __API_URL__: JSON.stringify(apiUrl),
    },
  }
})
