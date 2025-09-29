import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const tipos = ["int", "string", "float", "boolean", "json"];

const TestCaseParameters = ({
  prueba,
  index,
  agregarParametro,
  eliminarParametro,
  actualizarParametro,
}) => {
  return (
    <div className="test-content">
      <div className="param-header d-flex align-items-center gap-2">
        <span>Parámetros</span>
        <FaPlusCircle
          className="icon-plus"
          style={{ cursor: "pointer" }}
          onClick={() => agregarParametro(index)}
        />
      </div>
      <div className="param-grid parametros">
        <div className="param-grid-header">
          <span>Tipo</span>
          <span>Valor</span>
        </div>
        {prueba.entrada.map((param, paramIndex) => (
          <div
            key={paramIndex}
            className="param-row parametro align-items-center gap-2"
          >
            <select
              className="param-select tipo-parametro"
              value={param.tipo}
              onChange={(e) =>
                actualizarParametro(index, paramIndex, "tipo", e.target.value)
              }
            >
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className="param-value-container d-flex align-items-center gap-2">
              <input
                type="text"
                value={param.valor}
                className="valor-parametro"
                onChange={(e) =>
                  actualizarParametro(index, paramIndex, "valor", e.target.value)
                }
              />
              <FaCircleXmark
                className="icon-cancel"
                onClick={() => eliminarParametro(index, paramIndex)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCaseParameters;
