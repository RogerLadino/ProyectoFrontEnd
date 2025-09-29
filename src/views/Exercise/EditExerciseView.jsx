import React, { useState } from "react";
import "../../styles/ejercicio.css";
import "../../styles/pruebas.css";
import Sidebar from "../../components/Navigation/Sidebar";
import { TopBar } from "../../components/Navigation/TopBar";
import { FaPlusCircle } from "react-icons/fa";
import TestCase from "../../components/TestCases/TestCase";
import { useTestCases } from "../../hooks/useTestCases";

// Tipos permitidos
const tipos = ["int", "string", "float", "boolean", "json"];

const EditExerciseView = () => {
  // 🔹 Simulamos datos iniciales como si vinieran de la API
  const [nombre, setNombre] = useState("Ejemplo de ejercicio");
  const [descripcion, setDescripcion] = useState("Descripción inicial cargada");
  const [fechaEntrega, setFechaEntrega] = useState("2025-10-01T12:00");

  // 🔹 Hook para pruebas
  const {
    pruebas,
    agregarPrueba,
    actualizarPrueba,
    eliminarPrueba,
  } = useTestCases([
    {
      idPrueba: 1,
      nombreFuncion: "sumar",
      entrada: [
        { tipo: "int", valor: "2" },
        { tipo: "int", valor: "3" },
      ],
      salida: { tipo: "int", valor: "5" },
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      descripcion,
      fechaEntrega,
      pruebas,
    };

    console.log("🚀 Editar ejercicio:", payload);
    // Aquí iría la llamada a la API
  };

  const handleDelete = () => {
    console.log("🗑️ Eliminar ejercicio");
    // Aquí iría la lógica para borrar en la API
  };

  return (
    <div className="container-fluid m-0 p-0">
      <TopBar />

      <div className="row m-0 p-0">
        {/* Sidebar */}
        <Sidebar />

        <main className="col-12 col-md-10">
          <div className="exercise-header d-flex align-items-center gap-2 mb-4">
            <i className="icon-circle-empty"></i>
            <h2 className="mb-0">Editar Ejercicio</h2>
          </div>

          <form className="edit-form" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="input mb-3">
              <div className="input-label">
                <i className="icon-circle-empty"></i>
                <label>Nombre del ejercicio</label>
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="Nombre del ejercicio"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            {/* Descripción */}
            <div className="input mb-3">
              <div className="input-label">
                <i className="icon-circle-empty"></i>
                <label>Descripción</label>
              </div>
              <textarea
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
                <label>Fecha de entrega</label>
              </div>
              <input
                type="datetime-local"
                className="date-input"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
              />
            </div>

            {/* Pruebas */}
            <div className="input mb-3" id="lista-pruebas">
              <div className="input-label d-flex align-items-center gap-2">
                <i className="icon-circle-empty"></i>
                <label>Pruebas</label>
                <div
                  className="circle-plus ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={agregarPrueba}
                >
                  <FaPlusCircle />
                </div>
              </div>

              <div className="test-section pruebas">
                {pruebas.map((prueba, pIndex) => (
                  <TestCase
                    key={pIndex}
                    prueba={prueba}
                    onUpdate={(newData) => actualizarPrueba(pIndex, newData)}
                    onDelete={() => eliminarPrueba(pIndex)}
                    tipos={tipos}
                  />
                ))}
              </div>

              {/* Botones */}
              <div className="button-group mt-3">
                <button type="submit" className="button-secondary boton-guardar">
                  Guardar
                </button>
                <button
                  type="button"
                  className="button boton-borrar"
                  onClick={handleDelete}
                >
                  Borrar
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditExerciseView;
