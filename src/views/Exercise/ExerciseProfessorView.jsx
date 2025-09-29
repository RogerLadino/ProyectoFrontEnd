import React from "react";
import { FaCircle, FaCode, FaPencilAlt, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import { TopBar } from "../../components/Navigation/TopBar";
import Sidebar from "../../components/Navigation/Sidebar";

const ExerciseProfessorView = () => {
  // 🔹 Datos de prueba
  const ejercicio = {
    titulo: "Ejercicio 1",
  };

  const usuarios = [
    {
      idUsuario: 1,
      nombre1: "Carlos",
      apellido1: "Pérez",
      notaObtenida: 85,
      intentosRealizados: 2,
      estado: true,
    },
    {
      idUsuario: 2,
      nombre1: "María",
      apellido1: "Gómez",
      notaObtenida: null,
      intentosRealizados: 1,
      estado: false,
    },
  ];

  return (
    <div className="exercise-professor-view">
      <TopBar /> 
      <div className="container-fluid m-0 p-0">
        <div className="row m-0 p-0">
          <Sidebar />

          {/* MAIN CONTENT */}
          <main className="col-12 col-md-10 m-0 p-4">
            <form onSubmit={(e) => e.preventDefault()}>
              {/* HEADER */}
              <div className="exercise-header d-flex align-items-center gap-2 mb-4">
                <FaCircle className="icon-circle-empty" />
                <span className="ejercicio-titulo">{ejercicio.titulo}</span>
                <div className="title-buttons ms-auto d-flex gap-2">
                  <div className="title-button-container" style={{ minWidth: "150px" }}>
                    <button className="card-button" type="button">
                      <FaCode className="icon-code" /> Ver código
                    </button>
                  </div>
                  <div className="title-button-container" style={{ minWidth: "150px" }}>
                    <button className="card-button" type="button">
                      <FaPencilAlt className="icon-pencil" /> Editar ejercicio
                    </button>
                  </div>
                  <button type="submit" className="button" style={{ minWidth: "150px" }}>
                    Guardar
                  </button>
                </div>
              </div>

              {/* TABLA */}
              <table className="exercise-table table table-striped">
                <thead>
                  <tr className="table-header">
                    <th>Nombre</th>
                    <th>Nota</th>
                    <th>Intentos</th>
                    <th>Resuelto</th>
                    <th>A tiempo</th>
                    <th>Código</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {usuarios.map((usuario) => (
                    <tr className="table-row usuario" key={usuario.idUsuario}>
                      <td>
                        <FaCircle className="icon-circle icon-warning" />{" "}
                        {usuario.nombre1} {usuario.apellido1}
                      </td>
                      <td>
                        <input
                          name={`nota-${usuario.idUsuario}`}
                          type="text"
                          className="underline-input note-input"
                          defaultValue={usuario.notaObtenida ?? 0}
                        />
                        /100
                      </td>
                      <td>
                        <div className="attempts">{usuario.intentosRealizados ?? 0}</div>
                      </td>
                      <td>
                        <div className="checkmark">
                          {usuario.estado ? (
                            <FaCheck className="icon-check" />
                          ) : (
                            <FaTimes className="icon-cancel" />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="clock">
                          <FaClock className="icon-ok" />
                        </div>
                      </td>
                      <td>
                        <button type="button" className="card-button">
                          <FaCode className="icon-code" /> Ver código
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExerciseProfessorView;