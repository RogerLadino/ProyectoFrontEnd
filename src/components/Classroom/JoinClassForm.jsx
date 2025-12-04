import React, { useState, useContext } from "react";
import { ClassroomContext } from "../../context/Classroom/ClassroomContext";

export default function JoinClassForm() {
  const [code, setCode] = useState("");
  const { joinClassroom } = useContext(ClassroomContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    try {
      await joinClassroom(code.trim());
      setCode("");
    } catch (err) {
      console.error("Error al unirse a la clase:", err);
      // el context ya maneja los alerts
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-4">
      <div className="d-flex gap-2" style={{ maxWidth: 400 }}>
        <input
          type="text"
          name="codigo"
          className="form-control"
          placeholder="Código del aula"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Unirse</button>
      </div>
    </form>
  );
}
