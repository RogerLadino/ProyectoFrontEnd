import React from "react";
import "../../styles/ejercicio.css";
import Sidebar from "../../components/Navigation/Sidebar";
import { TopBar } from "../../components/Navigation/TopBar";
import { FaRegCircle, FaCheck, FaTimes, FaClock } from "react-icons/fa";

const ExerciseStudentView = () => {
  // 🔹 Datos de prueba (mock)
  const ejercicio = {
    nombre: "Ejercicio 1: Suma de Números",
    fechaEntrega: "2025-10-05T23:59",
    descripcion:
      "Implementa una función llamada `sumar(a, b)` que retorne la suma de dos números enteros.",
  };

  const entrega = {
    notaObtenida: 85,
    resuelto: true,
    aTiempo: true, // este lo dejamos aunque no estaba en la plantilla
  };

  const handleVerCodigo = () => {
    console.log("Navegar a ver código del ejercicio:", ejercicio.nombre);
  };

  return (
    <div className="container-fluid m-0 p-0">
      <TopBar />

      <div className="row m-0 p-0">
        <Sidebar />

        <main className="col-12 col-md-10">
          {/* Header */}
          <div className="exercise-header d-flex align-items-center gap-2 mb-4">
            <FaRegCircle className="icon-circle-empty" />
            <span className="ejercicio-titulo">{ejercicio.nombre}</span>
          </div>

          {/* Contenido principal */}
          <div className="exercise-container row">
            {/* Info del ejercicio */}
            <div className="exercise-content col-12 col-lg-8 mb-3">
              <p className="date-info">{ejercicio.fechaEntrega}</p>
              <p className="descripcion-ejercicio">{ejercicio.descripcion}</p>
            </div>

            {/* Info de la entrega */}
            <div className="exercise-info col-12 col-lg-4 mb-3">
              <table className="statistics table table-borderless">
                <tbody>
                  {/* Nota */}
                  <tr className="statistic">
                    <td className="statistic-label">
                      <FaRegCircle className="icon-circle-empty" />
                      <span>Nota</span>
                    </td>
                    <td className="score">
                      {entrega?.notaObtenida
                        ? `${entrega.notaObtenida}/100`
                        : "0/100"}
                    </td>
                  </tr>

                  {/* Resuelto */}
                  <tr className="statistic">
                    <td className="statistic-label">
                      <FaRegCircle className="icon-circle-empty" />
                      <span>Resuelto</span>
                    </td>
                    <td>
                      <div className="checkmark">
                        {entrega?.resuelto ? (
                          <FaCheck className="icon-check" />
                        ) : (
                          <FaTimes className="icon-cancel" />
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* A tiempo */}
                  <tr className="statistic">
                    <td className="statistic-label">
                      <FaRegCircle className="icon-circle-empty" />
                      <span>A tiempo</span>
                    </td>
                    <td>
                      <div className="clock">
                        {entrega?.aTiempo ? (
                          <FaCheck className="icon-check" />
                        ) : (
                          <FaClock className="icon-clock" />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Botón Ver Código */}
              <button
                type="button"
                className="button w-100"
                onClick={handleVerCodigo}
              >
                Ver código
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExerciseStudentView;
