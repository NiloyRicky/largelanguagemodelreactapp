import { Handle, Position } from "reactflow";
export default function OutputNode({ data }) {
  return (
    <div style={{ border: "1px solid #333", padding: "10px", borderRadius: "6px", background: "#fff" }}>
      <h4>Output</h4>
      <div style={{ height: "80px", background: "#f0f0f0", borderRadius: "4px", padding: "5px", overflowY: "auto" }}>
        Chat response will appear here...
      </div>
            <Handle type="target" position={Position.Left} id="output-input" style={{ background: "#555" }} />
    </div>
  );
}
