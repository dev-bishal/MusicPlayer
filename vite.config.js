import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// With history routing (no # in URLs) the base must be an absolute path.
// Locally it's '/'; the GitHub Actions workflow passes VITE_BASE=/<repo-name>/
// so the site works at https://<user>.github.io/<repo>/.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
})
