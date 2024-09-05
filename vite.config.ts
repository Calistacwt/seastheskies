import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: '/',
    server: {
      port: parseInt(env.VITE_APP_PORT || '3000'),
      host: true,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './public'),
      },
    },
    plugins: [react()],
  }
})
