import { useState } from "react";
import "../../styles/ejercicio.css";
import "../../styles/pruebas.css";
import Sidebar from "../../components/Navigation/Sidebar";
import { TopBar } from "../../components/Navigation/TopBar";
import { FaPlusCircle } from "react-icons/fa";
import TestCase from "../../components/TestCase/TestCase";
import { useTestCases } from "../../hooks/useTestCases";
import { useNavigate, useParams } from "react-router-dom";
import { createExercise } from "../../services/exercises.service";

const CreateExerciseView = () => {
  const { classroomId } = useParams();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const navigate = useNavigate();

  const {
    pruebas,
    agregarPrueba,
    eliminarPrueba,
    actualizarPrueba,
    agregarParametro,
    eliminarParametro,
    actualizarParametro,
    actualizarSalida,
    getParsedTestCases
  } = useTestCases();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createExercise(
      classroomId,
      nombre,
      descripcion,
      fechaEntrega,
      getParsedTestCases()
    );

    navigate(`/classroom/${classroomId}/exercise`);
  };

  return (
    <div className="container-fluid m-0 p-0">
      <TopBar />

      <div className="row m-0 pt-3">
        <Sidebar />

        <main className="col-12 col-md-10">
          <div className="exercise-header d-flex align-items-center gap-2 mb-4">
            <i className="icon-circle-empty"></i>
            <h2 className="mb-0">Crear Ejercicio</h2>
          </div>

          <form className="edit-form col row" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="input mb-3">
              <div className="input-label">
                <i className="icon-circle-empty"></i>
                <label htmlFor="nombreEjercicio">Nombre del ejercicio</label>
              </div>
              <input
                id="nombreEjercicio"
                type="text"
                className="input-field"
                placeholder="Nombre del ejercicio"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* Descripción */}
            <div className="input mb-3" style={{ height: "140px" }}>
              <div className="input-label">
                <i className="icon-circle-empty"></i>
                <label htmlFor="descripcionEjercicio">Descripción</label>
              </div>
              <textarea
                id="descripcionEjercicio"
                className="textbox-field"
                placeholder="Descripción del ejercicio"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            {/* Fecha */}
            <div className="input mb-3">
              <div className="input-label">
                <i className="icon-circle-empty"></i>
                <label htmlFor="fechaEntrega">Fecha de entrega</label>
              </div>
              <input
                id="fechaEntrega"
                type="datetime-local"
                className="date-input"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
              />
            </div>

            {/* Pruebas */}
            <div className="input mb-3" id="lista-pruebas">
              <div className="input-label d-flex align-items-center gap-2 container-fluid">
                <i className="icon-circle-empty"></i>
                <label htmlFor="pruebas">Pruebas</label>
                <div
                  className="circle-plus"
                  role="button"
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                  onClick={agregarPrueba}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      agregarPrueba();
                    }
                  }}
                >
                  <FaPlusCircle />
                </div>
              </div>

              <div className="test-section pruebas container-fluid">
                {pruebas.map((prueba) => (
                  <TestCase
                    key={prueba.id} // ✅ usar id único en lugar de índice
                    prueba={prueba}
                    index={pruebas.indexOf(prueba)}
                    actualizarPrueba={actualizarPrueba}
                    eliminarPrueba={eliminarPrueba}
                    agregarParametro={agregarParametro}
                    eliminarParametro={eliminarParametro}
                    actualizarParametro={actualizarParametro}
                    actualizarSalida={actualizarSalida}
                  />
                ))}
              </div>

              {/* Botón guardar */}
              <div className="mt-3 container-fluid">
                <button type="submit" className="button-secondary">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateExerciseView;