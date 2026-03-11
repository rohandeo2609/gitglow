import os
import traceback
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from github import Github
from google import genai
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["gitglow"]
history_collection = db["history"]

def save_to_history(url: str, content: str):
    history_collection.insert_one({"repo_url": url, "readme_content": content})

class RepoRequest(BaseModel):
    url: str
    vibe: str = "Professional"
    badges: List[str] = []

def get_repo_path(url):
    return url.replace("https://github.com/", "").strip("/")

@app.post("/generate-readme")
async def generate_readme(request: RepoRequest):
    try:
        github_token = os.getenv("GITHUB_TOKEN")
        if github_token:
            g = Github(github_token)
        else:
            g = Github()
            
        repo_path = get_repo_path(request.url)
        repo = g.get_repo(repo_path)
        
        contents = repo.get_contents("")
        file_summary = "Project Structure:\n"
        code_files = []
        
        items_checked = 0
        while contents and items_checked < 30:
            file_content = contents.pop(0)
            items_checked += 1
            if file_content.type == "dir":
                try:
                    contents.extend(repo.get_contents(file_content.path))
                except:
                    pass 
            else:
                file_summary += f"- {file_content.path}\n"
                if file_content.name.lower() in ['package.json', 'requirements.txt', 'main.py', 'app.py', 'index.js', 'cargo.toml', 'dockerfile']:
                    try:
                        decoded_content = file_content.decoded_content.decode('utf-8')
                        code_files.append(f"File: {file_content.path}\nContent:\n{decoded_content[:1500]}")
                    except:
                        pass

        vibe_instructions = {
            "Professional": "Use a formal, concise, and corporate tone. Focus on business value and scalability.",
            "Fun/Emoji": "Use a witty, energetic tone with plenty of relevant emojis. Make it sound exciting! 🚀",
            "Minimalist": "Be extremely brief. Use bullet points only where necessary. No fluff. Clean and stark.",
            "Academic": "Use a scholarly tone. Focus on methodology, citations, and theoretical underpinnings."
        }
        
        selected_vibe = vibe_instructions.get(request.vibe, vibe_instructions["Professional"])
        
        if request.badges:
            badge_instruction = f"Display these specific badges at the top: {', '.join(request.badges)}."
        else:
            badge_instruction = "DO NOT generate any badges, shield images, or status icons at the top."

        prompt = f"""
        You are an expert developer. Write a README.md for this GitHub project.
        
        BASIC INFO:
        - Repo Name: {repo.name}
        - Description: {repo.description if repo.description else 'No description provided'}
        
        USER PREFERENCES:
        - Tone: {selected_vibe}
        
        CONTEXT (File Structure):
        {file_summary}
        
        KEY CODE FILES:
        {chr(10).join(code_files)}
        
        INSTRUCTIONS:
        1. Start with a H1 Title.
        2. {badge_instruction}
        3. Write a compelling introduction based on the 'Context' and 'Code'.
        4. Infer the features from the code.
        5. Create an 'Installation' section based on the dependency files found (e.g. requirements.txt or package.json).
        6. Create a 'Usage' section.
        7. { 'Keep it under 200 words.' if request.vibe == 'Minimalist' else 'Be comprehensive.' }
        """

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        save_to_history(request.url, response.text)

        return {"readme": response.text}

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
async def get_history():
    rows = history_collection.find().sort("_id", -1).limit(20)
    
    result = []
    for row in rows:
        result.append({
            "id": str(row["_id"]),
            "repo_url": row["repo_url"],
            "readme_content": row["readme_content"]
        })
    
    return result