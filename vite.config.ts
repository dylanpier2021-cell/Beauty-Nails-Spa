import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import type { UserConfig } from 'vite'

// ssgOptions is a vite-react-ssg extension to the standard Vite config.
const config: UserConfig & { ssgOptions?: Record<string, unknown> } = {
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
  ssr: {
    // framer-motion ships ESM that vite-react-ssg can pre-render directly.
    noExternal: ['framer-motion'],
  },
  ssgOptions: {
    dirStyle: 'nested',
    mock: false,
  },
}

export default config
