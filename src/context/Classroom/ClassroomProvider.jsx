import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ClassroomContext } from "./ClassroomContext";
import * as classroomService from "../../services/classroom.service.js";

export default function ClassroomProvider({ children }) {
  const [classrooms, setClassrooms] = useState([]);
  const [alerts, setAlerts] = useState([]);

  /** 🔔 Eliminar alerta por ID */
  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  /** 🔔 Manejo de alertas */
  const pushAlert = (category, message, autoClose = 4000) => {
    const id = Date.now().toString();
    setAlerts((prev) => [...prev, { id, category, message }]);
    if (autoClose) {
      setTimeout(() => removeAlert(id), autoClose);
    }
  };

  /** 🌐 Carga inicial de aulas desde el backend */
  const fetchClassrooms = async () => {
    try {
      const data = await classroomService.getMyClassrooms();
      setClassrooms(data);
    } catch (err) {
      pushAlert("danger", "Error cargando aulas.");
    }
  };

  /** ➕ Unirse a una clase mediante código */
  const joinClassroom = async (code) => {
    try {
      const aula = await classroomService.joinClassroom(code);
      await fetchClassrooms()
      pushAlert("success", "Te uniste a la clase correctamente.");
      return aula;
    } catch (err) {
      pushAlert("danger", err.message || "No se pudo unir a la clase.");
      throw err;
    }
  };

  /** ➕ Añadir aula manual/local (sin API) */
  const addClassroom = (newClassroom) => {
    setClassrooms((prev) => [...prev, newClassroom]);
  };

  /** ✏️ Actualizar aula manual/local (sin API) */
  const updateClassroom = (id, updatedData) => {
    setClassrooms((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
  };

  const value = useMemo(() => ({
    classrooms,
    alerts,
    pushAlert,
    fetchClassrooms,
    joinClassroom,
    addClassroom,
    updateClassroom,
  }), [])

  return (
    <ClassroomContext.Provider
      value={value}
    >
      {children}
    </ClassroomContext.Provider>
  );
}

ClassroomProvider.propTypes = {
  children: PropTypes.node.isRequired
};
