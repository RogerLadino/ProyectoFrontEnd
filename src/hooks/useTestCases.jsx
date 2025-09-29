import { useState } from "react";

export const useTestCases = () => {
  const [pruebas, setPruebas] = useState([]);
  
  const agregarPrueba = () => {
    setPruebas((prev) => [
      ...prev,
      {
        idPrueba: null,
        nombreFuncion: "",
        entrada: [],
        salida: { tipo: "string", valor: "" },
      },
    ]);
  };

  const eliminarPrueba = (index) => {
    setPruebas((prev) => prev.filter((_, i) => i !== index));
  };

  const actualizarPrueba = (index, newData) => {
    setPruebas((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...newData } : p))
    );
  };

  const agregarParametro = (index) => {
    setPruebas((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        entrada: [...updated[index].entrada, { tipo: "string", valor: "" }],
      };
      return updated;
    });
  };

  const eliminarParametro = (pIndex, paramIndex) => {
    setPruebas((prev) => {
      const updated = [...prev];
      updated[pIndex] = {
        ...updated[pIndex],
        entrada: updated[pIndex].entrada.filter((_, i) => i !== paramIndex),
      };
      return updated;
    });
  };


  const actualizarParametro = (pIndex, paramIndex, key, value) => {
    setPruebas((prev) => {
      const updated = [...prev];
      updated[pIndex].entrada[paramIndex][key] = value;
      return updated;
    });
  };

  const actualizarSalida = (index, key, value) => {
    setPruebas((prev) => {
      const updated = [...prev];
      updated[index].salida[key] = value;
      return updated;
    });
  };

  return {
    pruebas,
    setPruebas,
    agregarPrueba,
    eliminarPrueba,
    actualizarPrueba,
    agregarParametro,
    eliminarParametro,
    actualizarParametro,
    actualizarSalida,
  };
};