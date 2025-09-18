
import { Handle, Position } from "reactflow";
import {uploadFile} from "../api"
export default function KnowledgeBaseNode({ id,data }) {

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Upload to backend
    const formData = new FormData();
    formData.append("file", file);

    // const res = await fetch("http://localhost:8000/upload", {
    //   method: "POST",
    //   body: formData,
    // });
    // const result = await res.json();


      const result = await uploadFile(file);
data.onChange(id, { fileId: result.id });
    // Save fileId in node data
    


    // Save fileId in node data
    //data.onChange(id, { fileId: result.fileId });
  };





  return (
    <div style={{ border: "1px solid #333", padding: "10px", borderRadius: "6px", background: "#fff" }}>
      <h4>Knowledge Base</h4>
      <input type="file" onChange={handleFileChange}/>
       {data.fileId && <p>Uploaded: {data.fileId}</p>}
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
