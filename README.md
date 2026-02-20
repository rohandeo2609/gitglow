# **GitGlow 🚀✨**

**Turn Code into Documentation.**

GitGlow is a modern, AI-powered SaaS tool that automatically generates comprehensive README.md files for GitHub repositories. Just paste a link, choose your vibe, and let the AI handle the writing.

## **✨ Features**

* **🔗 URL-to-README:** Instantly analyzes public GitHub repositories.  
* **🎨 Vibe Selector:** Choose between Professional, Fun/Emoji, Minimalist, or Academic tones.  
* **🛡️ Smart Badges:** Auto-generates Shields.io badges based on your tech stack.  
* **📜 History Tracking:** Keeps a local SQLite database of your previously generated READMEs.  
* **🌌 Cosmic UI:** A premium, dark-mode aesthetic with glassmorphism effects.

## **🛠️ Tech Stack**

**Frontend:**

* React (Vite)  
* TypeScript  
* Tailwind CSS  
* Lucide React Icons

**Backend:**

* FastAPI (Python)  
* Google Gemini Flash (AI Model)  
* SQLite (Database)  
* PyGithub (GitHub API wrapper)

**Infrastructure:**

* Docker Containerization

## **🚀 Getting Started**

### **Prerequisites**

* Docker Desktop installed  
* Node.js & npm  
* A Google Gemini API Key

### **Installation**

1. **Clone the repository**  
   git clone \[https://github.com/yourusername/GitGlow.git\](https://github.com/yourusername/GitGlow.git)  
   cd GitGlow

2. **Backend Setup (Docker)**  
   Navigate to the backend folder and create your .env file with your API key:  
   cd readmegen-backend  
   \# Create a file named .env and add: GEMINI\_API\_KEY=your\_key\_here

   Build and run the container:  
   docker build \-t gitglow-backend .  
   docker run \-p 8000:8000 \--env-file .env \-v ${PWD}:/app gitglow-backend

3. **Frontend Setup**  
   Open a new terminal and navigate to the frontend:  
   cd readmegen-frontend  
   npm install  
   npm run dev

4. **Usage**  
   Open your browser to http://localhost:5173.  
   * Paste a GitHub repository URL.  
   * Select your desired "Vibe".  
   * Click **Generate**.  
   * Copy your new README\!


## **🤝 Contributing**

Contributions are welcome\! Feel free to open issues or submit pull requests.

## **📄 License**

This project is open source.