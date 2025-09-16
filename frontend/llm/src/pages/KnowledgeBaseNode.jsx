
import { Handle, Position } from "reactflow";
export default function KnowledgeBaseNode({ data }) {
  return (
    <div style={{ border: "1px solid #333", padding: "10px", borderRadius: "6px", background: "#fff" }}>
      <h4>Knowledge Base</h4>
      <input type="file" />
      <select style={{ width: "100%", marginTop: "5px" }}>
        <option>OpenAI Embeddings</option>
        <option>Gemini Embeddings</option>
      </select>


    {/* Input handle */}
      <Handle type="target" position={Position.Left} id="kb-input" style={{ background: "#555" }} />

      {/* Output handle */}
      <Handle type="source" position={Position.Right} id="kb-output" style={{ background: "#555" }} />

      
    </div>
  );
}
