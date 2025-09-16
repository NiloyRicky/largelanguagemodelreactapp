

import { Handle, Position } from "reactflow";
export default function UserQueryNode({ data }) {
  return (
    <div style={{ border: "1px solid #333", padding: "10px", borderRadius: "6px", background: "#fff" }}>
      <h4>User Query</h4>
      <input type="text" placeholder="Enter your query" style={{ width: "100%" }} />
    
    
     {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="query-output"
        style={{ background: "#555" }}
      />
    
    </div>
  );
}
