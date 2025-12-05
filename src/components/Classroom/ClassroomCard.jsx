import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ClassroomCard({ aula }) {
  const id = aula.id || aula.idAula;
  const nombre = aula.nombre || aula.name || "Sin nombre";

  return (
    <Link
      to={`/classroom/${id}/exercise`}
      className="card text-light p-0"
      style={{ width: 160, height: 200, backgroundColor: "var(--card)", textDecoration: "none" }}
    >
      <div className="card-header text-center h-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "var(--accent)" }}>
      </div>
      <div style={{ height: "100%", backgroundColor: "var(--card)", padding: "5px" }}>
        <strong>{nombre}</strong>
      </div>
    </Link>
  );
}

ClassroomCard.propTypes = {
  aula: PropTypes.shape({
    id: PropTypes.number,
    idAula: PropTypes.number,
    nombre: PropTypes.string,
    name: PropTypes.string
  }).isRequired
};
