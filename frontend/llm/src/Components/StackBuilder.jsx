import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import UserQueryNode from "../pages/UserQueryNode";
import KnowledgeBaseNode from "../pages/KnowledgeBaseNode";
import LLMEngineNode from "../pages/LLMEngineNode";
import OutputNode from "../pages/OutputNode";



 const nodeTypes = {
    userQuery: UserQueryNode,
    knowledgeBase: KnowledgeBaseNode,
    llmEngine: LLMEngineNode,
    output: OutputNode,
  };

function StackBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

 

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    const position = reactFlowInstance.project({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${+new Date()}`,
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{ width: "240px", background: "#f4f4f4", padding: "10px" }}
        className="stackbuilder-sidebar"
      >
        <h3>Components</h3>
        <h4 draggable onDragStart={(e) => onDragStart(e, "userQuery")}>
          User Query
        </h4>
        <h4 draggable onDragStart={(e) => onDragStart(e, "knowledgeBase")}>
          Knowledge Base
        </h4>
        <h4 draggable onDragStart={(e) => onDragStart(e, "llmEngine")}>
          LLM Engine
        </h4>
        <h4 draggable onDragStart={(e) => onDragStart(e, "output")}>
          Output
        </h4>
      </div>

      {/* React Flow Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default StackBuilder;
