import { createContext, useState, useEffect } from "react";
import * as classroomService from "../../services/classroom.service";

export const ClassroomContext = createContext();

export function ClassroomProvider({ children }) {
  const [classrooms, setClassrooms] = useState([]);

  const fetchClassrooms = async () => {
    try {
      const data = await classroomService.getClassrooms();
      setClassrooms(data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  return (
    <ClassroomContext.Provider value={{ classrooms, fetchClassrooms }}>
      {children}
    </ClassroomContext.Provider>
  );
}
