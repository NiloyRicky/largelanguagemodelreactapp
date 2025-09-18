import os
import fitz  # PyMuPDF
from fastapi import APIRouter, UploadFile, File
from models import Document
from db import SessionLocal
from services.embeddings import embed_and_store

router = APIRouter()

@router.post("/upload", response_model=dict)
async def upload_file(file: UploadFile = File(...)):
    db = SessionLocal()
    contents = await file.read()

    # Save file locally
    file_path = f"uploads/{file.filename}"
    os.makedirs("uploads", exist_ok=True)
    with open(file_path, "wb") as f:
        f.write(contents)

    # Extract text from file
    text = ""
    if file.filename.lower().endswith(".pdf"):
        pdf_doc = fitz.open(file_path)
        for page in pdf_doc:
            text += page.get_text("text")
    else:
        # Try to decode as plain text (for .txt, .md, etc.)
        try:
            text = contents.decode("utf-8", errors="ignore")
        except Exception:
            text = ""

    # ✅ Save metadata in DB (after text is ready)
    doc = Document(filename=file.filename, content=text or "")
    db.add(doc)
    db.commit()
    db.refresh(doc)

    # Store embeddings
    if text.strip():
        embed_and_store(doc.id, text)

    return {"id": doc.id, "filename": doc.filename, "embedded": bool(text.strip())}
