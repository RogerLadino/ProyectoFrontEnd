import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClassroomContext } from "../../context/Classroom/ClassroomContext";
import * as classroomService from "../../services/classroom.service";

export default function TeacherClassroomCard({ aula }) {
  const navigate = useNavigate();
  const { fetchClassrooms, pushAlert } = useContext(ClassroomContext);

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro de eliminar esta clase?")) return;
    try {
      await classroomService.deleteClassroom(aula.idAula || aula.id);
      pushAlert("success", "Clase eliminada correctamente.");
      fetchClassrooms();
    } catch (error) {
      console.error(error);
      pushAlert("danger", "No se pudo eliminar la clase.");
    }
  };

  return (
    <Link
      to={`/classroom/${aula.id}/exercise`}
      className="card text-light"
      style={{ width: 160, backgroundColor: "var(--card)" }}
    >
      {/* Cabecera */}
      <div
        className="d-flex justify-content-center align-items-center card-header text-center"
        style={{ backgroundColor: "var(--accent)", height: 100 }}
      >
        <strong>{aula.nombre}</strong>
      </div>

      {/* Contenido */}
      <div className="card-body">
        <p className="card-text">{aula.name}</p>
        <p className="card-text">Código: {aula.code}</p>
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate(`/editar-clase/${aula.idAula || aula.id}`)}
          >
            Editar
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </Link>
  );
}
