# ✨ GitGlow — AI-Powered README Generator

> Paste a GitHub repository link, choose your documentation style, and let AI generate a polished README instantly. No more hours spent writing docs manually.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white)
![GitHub stars](https://img.shields.io/github/stars/rohandeo2609/gitglow?style=flat)

---

## 🔗 Live Demo

👉 **[gitglow-roan.vercel.app](https://gitglow-roan.vercel.app)**

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup (Docker)](#backend-setup-docker)
  - [Frontend Setup](#frontend-setup)
- [How To Use](#how-to-use)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Overview

**GitGlow** is a full-stack AI-powered SaaS tool that solves one of the most commonly ignored problems in software development — documentation.

Most repositories have either no README, incomplete documentation, or messy markdown. GitGlow fixes this by automatically analyzing any public GitHub repository and generating a structured, professional README using Google Gemini Flash.

The user simply pastes a repository URL, selects a documentation vibe, and receives a ready-to-use README in seconds.

---

## Features

- 🔗 **URL → README Generation** — Paste any public GitHub repository link and GitGlow analyzes it automatically via the GitHub API
- 🎭 **Documentation Vibe Selector** — Choose the tone: Professional, Minimalist, Fun/Emoji, or Academic
- 🏷️ **Smart Badge Generation** — Automatically generates Shields.io badges based on detected technologies in the repo
- 🧠 **AI-Powered Writing** — Powered by Google Gemini Flash for fast, structured, high-quality documentation
- 🗂️ **README History** — Previously generated READMEs are stored and retrievable via SQLite
- 🌌 **Modern Dark UI** — Clean dark interface built with React, TypeScript, and Tailwind CSS
- 🐳 **Dockerized Backend** — Fully containerized FastAPI backend for consistent and portable deployment

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | FastAPI, Python |
| **AI** | Google Gemini Flash API |
| **GitHub Integration** | PyGithub |
| **Database** | SQLite |
| **DevOps** | Docker |
| **Deployment** | Vercel (Frontend), Docker (Backend) |

---

## System Architecture

```
User Input (GitHub URL + Vibe)
        ↓
React Frontend (TypeScript + Tailwind)
        ↓
FastAPI Backend (Python)
        ↓
    ┌───────────────────────────┐
    │  GitHub API (PyGithub)    │  ← Fetches repo metadata, file tree, languages
    └───────────┬───────────────┘
                ↓
    ┌───────────────────────────┐
    │  Google Gemini Flash API  │  ← Generates structured README from context
    └───────────┬───────────────┘
                ↓
    ┌───────────────────────────┐
    │  SQLite Database          │  ← Stores README history per session
    └───────────────────────────┘
        ↓
Generated README returned to Frontend
```

---

## Project Structure

```
gitglow/
├── readmegen-backend/
│   ├── main.py               # FastAPI app entry point
│   ├── routes/               # API route handlers
│   ├── services/
│   │   ├── github.py         # GitHub API integration (PyGithub)
│   │   └── gemini.py         # Gemini AI prompt & response handling
│   ├── database.py           # SQLite setup and README history
│   ├── Dockerfile            # Backend Docker configuration
│   ├── requirements.txt
│   └── .env                  # API keys (not committed)
│
├── readmegen-frontend/
│   ├── src/
│   │   ├── components/       # React UI components
│   │   ├── App.tsx           # Main app entry
│   │   └── index.css         # Tailwind directives
│   ├── package.json
│   └── vite.config.ts
│
├── .gitattributes
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Docker Desktop
- Google Gemini API key → [Get one here](https://makersuite.google.com/app/apikey)

---

### Backend Setup (Docker)

```bash
# 1. Navigate to backend
cd readmegen-backend

# 2. Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 3. Build the Docker image
docker build -t gitglow-backend .

# 4. Run the container
docker run -p 8000:8000 --env-file .env -v ${PWD}:/app gitglow-backend
```

Backend API will be available at: `http://localhost:8000`  
Swagger docs: `http://localhost:8000/docs`

---

### Frontend Setup

```bash
# 1. Navigate to frontend
cd readmegen-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## How To Use

1. Open the web app at [gitglow-roan.vercel.app](https://gitglow-roan.vercel.app)
2. Paste any public GitHub repository URL
3. Select your preferred documentation vibe (Professional / Minimalist / Fun / Academic)
4. Click **Generate**
5. Copy or download the generated README

---

## Future Improvements

- [ ] GitHub OAuth login for personalised history
- [ ] In-browser Markdown editor for post-generation editing
- [ ] Live Markdown preview panel
- [ ] README export as `.md` file download
- [ ] Repository analytics (stars, forks, language breakdown)
- [ ] Support for private repositories via personal access tokens

---

## Author

**Rohan Deo**
B.Tech Computer Science Engineering · Pune, India
GitHub: [@rohandeo2609](https://github.com/rohandeo2609) · LinkedIn: [rohandeo4693](https://www.linkedin.com/in/rohandeo4693/) · X: [@RohanDeo26](https://x.com/RohanDeo26)

---

> *Built to eliminate the documentation bottleneck — because good code deserves a good README.*
