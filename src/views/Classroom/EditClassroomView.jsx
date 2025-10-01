import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TopBar } from "../../components/Navigation/TopBar";
import Sidebar from "../../components/Navigation/Sidebar";
import { ClassroomContext } from "../../context/Classroom/ClassroomContext";
import * as classroomService from "../../services/classroom.service";

export default function EditClassroomView() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { pushAlert } = useContext(ClassroomContext);

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const loadClassroom = async () => {
      try {
        const classroom = await classroomService.getClassroomById(id);

        setNombre(classroom.nombre);
      } catch (error) {
        console.error(error);
        pushAlert("danger", "No se pudo cargar la información de la clase.");
      }
    };

    loadClassroom();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await classroomService.updateClassroom(id, { name: nombre });

      pushAlert("success", "Clase actualizada correctamente.");

      navigate("/clases");
    } catch (error) {
      console.error(error);
      pushAlert("danger", "No se pudo actualizar la clase.");
    }
  };

  return (
    <>
      <TopBar />
      <div className="d-flex">
        <Sidebar />
        <main className="main-content p-4 w-100">
          {/* Título */}
          <div className="titulo-clase mb-4">
            <div className="titulo d-flex align-items-center gap-2">
              <div className="cuadrado"></div>
              <h1 className="mb-0">Editar Clase</h1>
            </div>
          </div>

          {/* Formulario */}
          <div
            className="card p-4 rounded"
            style={{ backgroundColor: "var(--card)", maxWidth: 500 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label d-flex align-items-center gap-2">
                  <i className="icon-circle-empty"></i> Nombre de la clase
                </label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={nombre ?? ""} 
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/clases")}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn text-light"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
