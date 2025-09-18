# 🧠 No-Code AI Workflow Builder

A **visual workflow builder** that lets you create AI pipelines by dragging and connecting nodes like **User Query**, **Knowledge Base**, **LLM Engine**, and **Output**.  
This project allows you to upload documents (e.g., resumes), embed them locally using **ChromaDB**, and query them with **local or OpenAI models**.

---

## 🚀 Features

- 🎨 **Visual Node-based Workflow**
  - Build pipelines with drag-and-drop nodes in ReactFlow
  - Connect queries → knowledge base → LLM → output

- 📂 **Knowledge Base**
  - Upload PDFs or text files
  - Store embeddings in **ChromaDB** for fast similarity search

- 🤖 **LLM Engine**
  - Supports both **OpenAI API models** (gpt-3.5, gpt-4)  
  - Supports **Local HuggingFace models** (e.g., GPT-2) — runs free without tokens

- 🧾 **Output Node**
  - Displays AI-generated answers directly in the workflow UI

- 🔗 **Custom Workflow Execution**
  - Automatically parses nodes + edges
  - Passes query → retrieves context → generates LLM answer → outputs result

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + Vite
- 🎨 ReactFlow (for node editor)
- 📦 Axios (for API calls)

### Backend
- ⚡ FastAPI (Python)
- 📂 ChromaDB (vector storage)
- 🧠 HuggingFace Transformers (local models like GPT-2)
- (Optional) OpenAI API (cloud-based LLMs + embeddings)

### Database
- SQLite (default) for Chroma storage

---
## 📁 Project Structure

/frontend
├── src/
│ ├── pages/
│ │ ├── UserQueryNode.jsx
│ │ ├── KnowledgeBaseNode.jsx
│ │ ├── LLMEngineNode.jsx
│ │ ├── OutputNode.jsx
│ └── StackBuilder.jsx
└── api.js

/backend/
├── main.py
├── db.py
├── routes/
│ ├── upload.py
│ ├── workflow.py
├── schemas.py
└── services/
├── embeddings.py
├── llm.py


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/NiloyRicky/largelanguagemodelreactapp.git
cd your-repo-name

2. Backend Setup (FastAPI + Chroma + HuggingFace)
cd backend
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)
pip install -r requirements.txt

Create a requirements.txt with:

fastapi
uvicorn
chromadb
sqlalchemy
pydantic
transformers
torch

Run Backend:
uvicorn app.main:app --reload --port 8000
Backend runs at  http://localhost:8000

Frontend Set up (React+Vite)
cd frontend
npm install
npm run dev


Workflow Example

Drag a User Query Node → type: "What are my achievements?"

Drag a Knowledge Base Node → upload resume.pdf

Drag an LLM Engine Node → select local GPT-2 or OpenAI

Drag an Output Node

Connect them:
User Query → Knowledge Base → LLM Engine → Output

Click Run Workflow

🎉 See the generated response in the Output node.

💾 File & Embedding Storage

Uploaded files → stored in backend /uploads/

Embeddings → stored in ChromaDB (default SQLite inside .chromadb/)

Local models → cached by HuggingFace in ~/.cache/huggingface/

🚧 Roadmap / Next Steps

 Support for more HuggingFace models (e.g., LLaMA 2, Mistral)

 Fine-tuning embeddings per project

 Multi-document context retrieval

 Workflow export/import as JSON

 Authentication for multi-user support

🤝 Contributing

Contributions are welcome!
Please fork the repo and create a PR with clear commit messages.

📜 License

MIT License © 2025 Niloy Mondal









