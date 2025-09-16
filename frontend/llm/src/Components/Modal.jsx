// Nodal.jsx
import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleCreate = () => {
    onCreate({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
          Create New Stack
        </h2>

        {/* Name Input */}
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter stack name"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {/* Description Input */}
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your stack (max 300 words)"
          rows={6}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        ></textarea>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#ccc",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
