# Personal Meme Survey

**📝 Available at: https://haivlab-postech.github.io/survey/personal_meme_survey/**


This project is a web-based survey application built with **React** and **Vite**, designed to collect user responses on memes and emotions.

> 🧪 **Originally forked from:**  
> https://github.com/KrDmitri/graph-proj-survey

---

## 🔧 Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- GitHub Actions for automated deployment

---

## 🏗️ Build
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🚀 Development

The app is automatically deployed to the gh-pages branch using GitHub Actions, and is publicly accessible at: 
https://haivlab-postech.github.io/survey/personal_meme_survey/

### Deployment Flow

- You commit code to the main branch
- GitHub Actions builds the app using vite build
- The contents of the dist/ folder are pushed to the gh-pages branch under: `gh-pages/survey/personal_meme_survey/`
- GitHub Pages is configured to serve from the gh-pages branch, root directory (/)

### Directory Structure

```
survey/personal_meme_survey/
├── .github/
│   └── workflows/
│       └── deploy-survey.yml        # GitHub Actions workflow
├── public/                          # Static public assets
├── src/                             # React components and logic
│   └── components/
├── dist/                            # Build output (auto-generated)
├── vite.config.ts                   # Vite config with base path
├── package.json
├── tsconfig.json
└── README.md
```