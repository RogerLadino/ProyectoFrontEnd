import React from "react";

const TestCaseFunction = ({ prueba, index, actualizarPrueba }) => {
  return (
    <div className="test-content">
      <div className="param-header">
        <span>Función</span>
      </div>
      <div className="param-grid">
        <div className="param-grid-header">
          <span>Nombre</span>
        </div>
        <div className="param-row">
          <input
            type="text"
            className="valor-parametro nombre-funcion"
            placeholder="Nombre de la función"
            value={prueba.nombreFuncion}
            onChange={(e) =>
              actualizarPrueba(index, { nombreFuncion: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TestCaseFunction;
