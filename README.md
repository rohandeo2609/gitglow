# ✨ GitGlow

### Turn Code Into Beautiful Documentation

![GitHub
stars](https://img.shields.io/github/stars/rohandeo2609/gitglow?style=for-the-badge)
![GitHub
forks](https://img.shields.io/github/forks/rohandeo2609/gitglow?style=for-the-badge)
![GitHub repo
size](https://img.shields.io/github/repo-size/rohandeo2609/gitglow?style=for-the-badge)
![License](https://img.shields.io/github/license/rohandeo2609/gitglow?style=for-the-badge)

GitGlow is an **AI-powered SaaS tool that automatically generates
professional README files for any GitHub repository**.

Just paste a repository link, choose your documentation style, and let
AI generate a polished README instantly.

Perfect for developers who want **clean documentation without wasting
hours writing it manually**.

------------------------------------------------------------------------

# 🚀 Live Demo

🌐 https://gitglow-roan.vercel.app

------------------------------------------------------------------------

# 🧠 The Idea

Documentation is one of the most ignored parts of software development.

Most repositories either have: - No README - Incomplete documentation -
Messy markdown

GitGlow solves this by **automatically generating structured
documentation using AI.**

Paste a GitHub repo → choose a style → get a ready-to-use README.

------------------------------------------------------------------------

# ⚡ Features

### 🔗 URL → README Generation

Paste any public GitHub repository link and GitGlow analyzes it
automatically.

### 🎭 Documentation "Vibe" Selector

Choose the tone of the README: - Professional - Minimalist - Fun /
Emoji - Academic

### 🏷 Smart Badges

Automatically generates Shields.io badges based on detected
technologies.

### 🧠 AI-Powered Writing

Uses Google Gemini Flash to generate structured documentation.

### 🗂 README History

Generated READMEs are stored using SQLite.

### 🌌 Modern UI

Clean dark interface built with Tailwind + React.

------------------------------------------------------------------------

# 🏗 Architecture

React Frontend → FastAPI Backend → GitHub API + Gemini AI → SQLite

------------------------------------------------------------------------

# 🛠 Tech Stack

## Frontend

-   React (Vite)
-   TypeScript
-   Tailwind CSS
-   Lucide Icons

## Backend

-   FastAPI
-   Python
-   Google Gemini Flash API
-   PyGithub

## Database

-   SQLite

## DevOps

-   Docker

------------------------------------------------------------------------

# 📦 Installation

Clone the repository:

git clone https://github.com/rohandeo2609/gitglow.git cd gitglow

------------------------------------------------------------------------

# 🐳 Backend Setup

cd readmegen-backend

Create `.env`

GEMINI_API_KEY=your_api_key_here

Build Docker container

docker build -t gitglow-backend .

Run container

docker run -p 8000:8000 --env-file .env -v \${PWD}:/app gitglow-backend

------------------------------------------------------------------------

# 💻 Frontend Setup

cd readmegen-frontend\
npm install\
npm run dev

Open:

http://localhost:5173

------------------------------------------------------------------------

# 🧪 How To Use

1.  Open the web app
2.  Paste a GitHub repository URL
3.  Select your documentation vibe
4.  Click **Generate**
5.  Copy the generated README

------------------------------------------------------------------------

# 📁 Project Structure

gitglow │ ├── readmegen-backend ├── readmegen-frontend └── README.md

------------------------------------------------------------------------

# 🔮 Future Improvements

-   GitHub OAuth login
-   README editing UI
-   Markdown preview
-   README export templates
-   Repo analytics

------------------------------------------------------------------------

# 👨‍💻 Author

**Rohan Deo**

GitHub\
https://github.com/rohandeo2609

LinkedIn\
https://www.linkedin.com/in/rohandeo4693/

X (Twitter)\
https://x.com/RohanDeo26

------------------------------------------------------------------------

# ⭐ Support

If you found this project useful:

⭐ Star the repository\
🍴 Fork it\
📢 Share it with other developers
