import React, { useContext } from "react";
import { ClassroomContext } from "../../context/Classroom/ClassroomContext";
import JoinClassForm from "../../components/Classroom/JoinClassForm";
import ClassroomCard from "../../components/Classroom/ClassroomCard";
import Alert from "../../components/Alert";
import Navbar from "../../components/Navigation/TopBar";
import Sidebar from "../../components/Navigation/Sidebar";

export default function ListClassroomView() {
  const { classrooms, alerts } = useContext(ClassroomContext);

  return (
    <>
      <TopBar />
      <div className="d-flex">
        <Sidebar />
        <main className="main-content p-4 w-100">
          <h2>Clases en las que estás inscrito</h2>

          <JoinClassForm />

          {alerts && alerts.length > 0 && alerts.map((a) => <Alert key={a.id} alert={a} />)}

          {classrooms && classrooms.length ? (
            <div className="d-flex gap-3 flex-wrap mt-4">
              {classrooms.map((aula) => (
                <ClassroomCard key={aula.id || aula.idAula} aula={aula} />
              ))}
            </div>
          ) : (
            <p className="mt-4">No estás inscrito en ninguna clase.</p>
          )}
        </main>
      </div>
    </>
  );
}
