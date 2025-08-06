import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/survey/personal_meme_survey/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [react()],
})