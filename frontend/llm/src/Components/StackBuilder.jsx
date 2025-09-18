import React, { useState ,useCallback, useEffect} from "react";
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
import axios from "axios";


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



  useEffect(()=>{
console.log("Current Workflow State:", nodes);
  },[nodes])
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

 

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };




 // 👇 Centralized node data update
 const onChangeNodeData = useCallback((id, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData, onChange: onChangeNodeData } } : node
      )
    );
  }, []);




  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type  || !reactFlowInstance) return;

    const position = reactFlowInstance.project({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${+new Date()}`,
      type,
      position,
      data: { label: `${type} node`,onChange: onChangeNodeData },
    };

    setNodes((nds) => nds.concat(newNode));
  };






  // 👇 When you create a new node, inject the onChange handler
  const addNode = (type) => {
    setNodes((nds) => [
      ...nds,
      {
        id: `${nds.length + 1}`,
        type,
        position: { x: 100, y: 100 + nds.length * 100 },
        data: { onChange: onChangeNodeData },
      },
    ]);
  };

  // 🚀 Send workflow to backend
  const runWorkflow = async () => {
     const userNode = nodes.find((n) => n.type === "userQuery");
  const userQuery = userNode?.data?.query || "";
    const res = await fetch("http://localhost:8000/run-workflow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges,query:userQuery }),
    });
    const result = await res.json();
    alert(result.answer); // Show in popup for now
      // find the output node
 

 const outputNode = nodes.find((n) => n.type === "output");
  if (outputNode) {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === outputNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                answer: result.answer, // 👈 backend response
              },
            }
          : node
      )
    );
  }



  }






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
           <button onClick={runWorkflow} style={{ marginTop: "20px" }}>Run Workflow</button>
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
