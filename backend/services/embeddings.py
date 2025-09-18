# services/embeddings.py
import chromadb
from sentence_transformers import SentenceTransformer

# Initialize local embedding model (downloaded once and cached)
model = SentenceTransformer("all-MiniLM-L6-v2")

# Initialize ChromaDB
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection("documents")


def chunk_text(text: str, chunk_size: int = 500):
    """Split text into smaller chunks for embedding."""
    words = text.split()
    for i in range(0, len(words), chunk_size):
        yield " ".join(words[i:i + chunk_size])


def embed_and_store(doc_id: int, text: str):
    """Embed text using local model and store in ChromaDB."""
    for chunk in chunk_text(text):
        embedding = model.encode(chunk).tolist()

        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            ids=[f"{doc_id}-{hash(chunk)}"]
        )


def retrieve_context(query: str, top_k: int = 3) -> str:
    """Retrieve most relevant context from stored documents."""
    query_embedding = model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    if results and "documents" in results:
        docs = results["documents"][0]  # first query
        return "\n".join(docs)

    return ""
