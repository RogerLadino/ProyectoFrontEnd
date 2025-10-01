import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TopBar from "../../components/Navigation/TopBar";
import Sidebar from "../../components/Navigation/Sidebar";
import { ClassroomContext } from "../../context/Classroom/ClassroomContext";
import TeacherClassroomCard from "../../components/Classroom/TeacherClassroomCard";
import * as classroomService from "../../services/classroom.service.js";

export default function TeacherClassroomView() {
  const { classrooms, fetchClassrooms, pushAlert } = useContext(ClassroomContext);
  useEffect(() => {
    fetchClassrooms();
  }, [fetchClassrooms]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro de eliminar esta clase?")) return;
    try {
      await classroomService.deleteClassroom(id);
      pushAlert("success", "Clase eliminada correctamente.");
      fetchClassrooms();
    } catch (error) {
      console.error(error);
      pushAlert("danger", "No se pudo eliminar la clase.");
    }
  };

  return (
    <>
      <TopBar />
      <div className="d-flex">
        <Sidebar />
        <main className="main-content p-4 w-100">
          {/* Botón Crear */}
          <div className="d-flex justify-content-end mb-4 gap-2">
            <Link
              className="btn text-light"
              to="/crear-clase"
              style={{ backgroundColor: "var(--card)" }}
            >
              <i className="icon-plus-circled"></i> Crear Clase
            </Link>
          </div>

          {/* Lista de clases */}
          <div className="clases-contenedor">
            <h2>Clases que dictas</h2>

            {classrooms && classrooms.length > 0 ? (
              <div className="d-flex gap-3 flex-wrap">
                {classrooms.map((aula) => (
                  <TeacherClassroomCard
                    key={aula.idAula || aula.id}
                    aula={aula}
                    onDelete={() => handleDelete(aula.idAula || aula.id)}
                  />
                ))}
              </div>
            ) : (
              <p>No tienes clases aún. Crea una para comenzar.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

