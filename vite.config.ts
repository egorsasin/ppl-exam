import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/ppl-exam/ on GitHub Pages.
  base: '/ppl-exam/',
  plugins: [react(), tailwindcss()],
})
