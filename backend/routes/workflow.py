# routes/workflow.py
from fastapi import APIRouter
from schemas import WorkflowRunRequest, WorkflowRunResponse
from services.embeddings import retrieve_context
from services.llm import run_llm

router = APIRouter()


@router.post("/run-workflow", response_model=WorkflowRunResponse)
async def run_workflow(request: WorkflowRunRequest):
    """
    Orchestrates workflow execution based on the provided nodes.
    """
    answer = "No valid workflow executed."

    # Step 1: Extract query from UserQuery node
    query_node = next((n for n in request.nodes if n.type == "userQuery"), None)
    if not query_node:
        return {"answer": "No user query provided."}

    query_text = query_node.data.get("query")

    # Step 2: Retrieve context if KnowledgeBase is in workflow
    kb_node = next((n for n in request.nodes if n.type == "knowledgeBase"), None)
    context = ""
    if kb_node:
        context = retrieve_context(query_text)

    # Step 3: Run LLM if LLM node is in workflow
    llm_node = next((n for n in request.nodes if n.type == "llmEngine"), None)
    if llm_node:
        answer = run_llm(query_text, context)
    else:
        answer = f"(No LLM node) Query: {query_text}, Context: {context}"

    # Step 4: Return final answer (Output node is implicit here)
    return WorkflowRunResponse(answer=answer)
