import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works both locally (at /) and under the
  // /ppl-exam/ path on GitHub Pages.
  base: './',
  plugins: [react(), tailwindcss()],
})
