import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/survey/personal_meme_survey/', // 중요한 설정!
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [react()]
})