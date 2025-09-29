import React from "react";

const tipos = ["int", "string", "float", "boolean", "json"];

const TestCaseOutput = ({ prueba, index, actualizarSalida }) => {
  return (
    <div className="test-content">
      <div className="param-header">
        <span>Debe retornar</span>
      </div>
      <div className="param-grid">
        <div className="param-grid-header">
          <span>Tipo</span>
          <span>Valor</span>
        </div>
        <div className="param-row align-items-center gap-2">
          <select
            className="param-select tipo-retorno"
            value={prueba.salida.tipo}
            onChange={(e) => actualizarSalida(index, "tipo", e.target.value)}
          >
            {tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="valor-retorno valor-parametro"
            value={prueba.salida.valor}
            onChange={(e) => actualizarSalida(index, "valor", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TestCaseOutput;
