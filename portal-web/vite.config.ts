import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const app = process.env.VITE_APP || 'login'

const portMap: Record<string, number> = {
  login: 3001,
  student: 3002,
  parent: 3003,
  faculty: 3004,
}

/**
 * Renames the output HTML file (e.g. login.html) to index.html
 * so that S3/CloudFront static hosting serves it as the default document.
 */
function renameHtmlPlugin(): Plugin {
  return {
    name: 'rename-html-to-index',
    closeBundle() {
      const outDir = path.resolve(__dirname, `dist/${app}`)
      const srcFile = path.join(outDir, `${app}.html`)
      const destFile = path.join(outDir, 'index.html')
      if (fs.existsSync(srcFile)) {
        fs.renameSync(srcFile, destFile)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), renameHtmlPlugin()],
  server: {
    port: portMap[app] || 3001,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: `dist/${app}`,
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, `${app}.html`),
    },
  },
})
