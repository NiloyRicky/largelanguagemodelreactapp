

import { Handle, Position } from "reactflow";
export default function LLMEngineNode({ data }) {
  return (
    <div style={{ border: "1px solid #333", padding: "10px", borderRadius: "6px", background: "#fff" }}>
      <h4>LLM Engine</h4>
      <select style={{ width: "100%" }}>
        <option>OpenAI GPT</option>
        <option>Gemini</option>
      </select>
      <textarea placeholder="Custom prompt (optional)" style={{ width: "100%", marginTop: "5px" }} />
      <label>
        <input type="checkbox" /> Use Web Search (SerpAPI)
      </label>


         {/* Input handle */}
      <Handle type="target" position={Position.Left} id="llm-input" style={{ background: "#555" }} />

      {/* Output handle */}
      <Handle type="source" position={Position.Right} id="llm-output" style={{ background: "#555" }} />
    </div>
  );
}
