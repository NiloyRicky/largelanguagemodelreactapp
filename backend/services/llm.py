# services/llm.py
from transformers import pipeline

# ✅ Load Flan-T5 (better than GPT-2 for Q&A)
generator = pipeline("text2text-generation", model="google/flan-t5-base")

def run_llm(query: str, context: str = "") -> str:
    """
    Run the local LLM with context + query.
    """
    prompt = f"Context:\n{context}\n\nQuestion: {query}\nAnswer:"
    try:
        result = generator(prompt, max_new_tokens=200, num_return_sequences=1)
        # Flan-T5 only generates the answer, no need to strip much
        return result[0]["generated_text"].strip()
    except Exception as e:
        return f"Error running local LLM: {str(e)}"
