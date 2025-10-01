import React from "react";
import { Link } from "react-router-dom";

export default function ClassroomCard({ aula }) {
  const id = aula.id || aula.idAula;
  const nombre = aula.nombre || aula.name || "Sin nombre";
  return (
    <Link
      to={`/aulas/${id}/ejercicios`}
      className="card text-light p-0"
      style={{ width: 160, height: 200, backgroundColor: "var(--card)", textDecoration: "none" }}
    >
      <div className="card-header text-center h-100 d-flex justify-content-center align-items-center"
           style={{ backgroundColor: "var(--accent)" }}>
        <strong>{nombre}</strong>
      </div>
      <div style={{ height: "100%", backgroundColor: "var(--card)" }} />
    </Link>
  );
}
