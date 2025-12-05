import React, { useState, useContext } from "react";
import { ClassroomContext } from "../../context/Classroom/ClassroomContext";
import { TopBar } from "../../components/Navigation/TopBar";
import Sidebar from "../../components/Navigation/Sidebar";
import { useNavigate } from "react-router-dom";
import * as classroomService from "../../services/classroom.service";
import '../../styles/clases.css'

export default function CreateClassroomView() {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();
  const { pushAlert } = useContext(ClassroomContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await classroomService.createClassroom({
        name: nombre
      });

      pushAlert("success", "Clase creada exitosamente.");

      navigate("/clases");
    } catch (error) {
      console.error("Error al crear la clase:", error);
      pushAlert("danger", "No se pudo crear la clase.");
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
              <h1 className="mb-0">Crear Clase</h1>
            </div>
          </div>

          {/* Formulario */}
          <div
            className="card p-4"
            style={{ backgroundColor: "var(--card)", maxWidth: 500 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label d-flex align-items-center gap-2">
                  <i className="icon-circle-empty"></i>
                  <span>Nombre de la clase</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  placeholder="Ejemplo: Matemáticas"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex gap-3">
                <button
                  type="submit"
                  className="btn text-light"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Crear
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/clases")}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
