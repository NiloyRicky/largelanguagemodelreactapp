# app/main.py
from fastapi import FastAPI
from routes import upload, workflow
from db import Base, engine
from fastapi.middleware.cors import CORSMiddleware
# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(upload.router)
app.include_router(workflow.router)

@app.get("/")
def root():
    return {"message": "Backend running!"}
