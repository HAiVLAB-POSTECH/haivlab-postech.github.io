// survey/personal_meme_survey/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/survey/personal_meme_survey/', // 경로 유지
  build: {
    outDir: '_deploy',
    emptyOutDir: true
  },
  plugins: [react()]
})