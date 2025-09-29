import React, { useState } from "react";
import TestCaseHeader from "./TestCaseHeader";
import TestCaseFunction from "./TestCaseFunction";
import TestCaseParameters from "./TestCaseParameters";
import TestCaseOutput from "./TestCaseOutput";

const TestCase = ({
  prueba,
  index,
  actualizarPrueba,
  eliminarPrueba,
  agregarParametro,
  eliminarParametro,
  actualizarParametro,
  actualizarSalida,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="test-accordion prueba mb-3">
      <TestCaseHeader
        prueba={prueba}
        index={index}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        eliminarPrueba={eliminarPrueba}
      />

      {isOpen && (
        <div className="test-main-content">
          <TestCaseFunction
            prueba={prueba}
            index={index}
            actualizarPrueba={actualizarPrueba}
          />

          <TestCaseParameters
            prueba={prueba}
            index={index}
            agregarParametro={agregarParametro}
            eliminarParametro={eliminarParametro}
            actualizarParametro={actualizarParametro}
          />

          <TestCaseOutput
            prueba={prueba}
            index={index}
            actualizarSalida={actualizarSalida}
          />
        </div>
      )}
    </div>
  );
};

export default TestCase;
