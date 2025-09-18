import { Handle, Position } from "reactflow";

export default function OutputNode({ id, data }) {
  return (
    <div
      style={{
        border: "1px solid #333",
        padding: "10px",
        borderRadius: "6px",
        background: "#fff",
      }}
    >
      <h4>Output</h4>
      <div
        style={{
          height: "80px",
          background: "#f0f0f0",
          borderRadius: "4px",
          padding: "5px",
          overflowY: "auto",
        }}
      >
        {data?.answer ? data.answer : "Waiting for response..."}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="output-input"
        style={{ background: "#555" }}
      />
    </div>
  );
}
