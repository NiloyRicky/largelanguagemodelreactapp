

import { Handle, Position } from "reactflow";
export default function LLMEngineNode({ id,data }) {



const handleChange = (field, value) => {
    if (data?.onChange) {
      data.onChange(id, { [field]: value });
    }
  };

  return (
    <div style={{ border: "1px solid #333", padding: "10px", borderRadius: "6px", background: "#fff" }}>
      <h4>LLM Engine</h4>
      <select style={{ width: "100%" }} value={data?.model || "OpenAI GPT"} onChange={(e) => handleChange("model", e.target.value)}>
        <option  value="OpenAI GPT">OpenAI GPT</option>
        <option value="Gemini">Gemini</option>
      </select>
      <textarea placeholder="Custom prompt (optional)" style={{ width: "100%", marginTop: "5px" }}
      value={data?.prompt || ""}
        onChange={(e) => handleChange("prompt", e.target.value)}/>
      <label>
        <input type="checkbox"
         checked={data?.useWebSearch || false}
          onChange={(e) => handleChange("useWebSearch", e.target.checked)}
        /> Use Web Search (SerpAPI)
      </label>


         {/* Input handle */}
      <Handle type="target" position={Position.Left} id="llm-input" style={{ background: "#555" }} />

      {/* Output handle */}
      <Handle type="source" position={Position.Right} id="llm-output" style={{ background: "#555" }} />
    </div>
  );
}
