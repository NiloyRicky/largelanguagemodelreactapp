# app/schemas.py
from pydantic import BaseModel
from typing import List, Dict, Any, Optional


class DocumentUploadResponse(BaseModel):
    id: int
    filename: str


class WorkflowNode(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = {}


class WorkflowEdge(BaseModel):
    id: str
    source: str
    target: str


class WorkflowRunRequest(BaseModel):
    nodes: List[WorkflowNode]
    edges: Optional[List[WorkflowEdge]] = []


class WorkflowRunResponse(BaseModel):
    answer: str
