import '../../styles/lista-ejercicios.css'
import { TopBar } from '../../components/Navigation/TopBar'
import Sidebar from '../../components/Navigation/Sidebar';
import { useEffect, useState } from 'react';
import { getExercisesByClassroom } from '../../services/exercises.service';
import { getClassroomById } from '../../services/classroom.service';
import { useParams } from 'react-router-dom';

export const ListExerciseView = () => {
  const { classroomId } = useParams();
  const [exercises, setExercises] = useState([])
  const [classroom, setClassroom] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const fetchExercises = await getExercisesByClassroom(classroomId)
      const fetchClassroom = await getClassroomById(classroomId)

      setExercises(fetchExercises)
      setClassroom(fetchClassroom)
    }

    fetchData()
  }, [])

  const aula = {
    nombre: "Programación I",
    codigo: "ABC123",
    profesor: "Juan Pérez",
  };

  const isProfessor = true

  return (
    <>
      <TopBar />
      <div className="row m-0 p-0">
        <Sidebar />
        <main className="col-12 col-md-10 m-0 p-0">
          <div className="row p-2 m-0">
            <div className="col-12 p-0 m-0">
              <div className="titulo-clase mb-3">
                <div className="titulo">
                  <div className="cuadrado"></div>
                  <h1 className="nombre-clase m-0 p-0">{classroom.name}</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="row p-0 m-0">
            <div className="col-12 m-0 p-0">
              <div className="container-fluid m-0 p-0 py-2 row">
                {/* Bloque de código (solo para profesor) */}
                {isProfessor && (
                  <div className="col-12 col-md-2 mr-2 px-2 py-1">
                    <div className="w-100 h-100 codigo p-2 align-items-center flex-row justify-content-center justify-content-md-start flex-md-column test-title">
                      <span
                        style={{ display: "flex", fontSize: "18px" }}
                        className="fw-bold px-2"
                      >
                        Código
                        <a
                          style={{ color: "var(--card)" }}
                          className="icon-pencil"
                          href={`/aula/${classroom.code}/editar-codigo`}
                        ></a>
                      </span>
                      <div>
                        <p className="codigo-clase fw-bold m-0 p-0">
                          {classroom.code}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className={`col-12 ${isProfessor ? "col-md-10" : ""} m-0 px-2 py-1`}>
                  {/* Botones (solo para profesor) */}
                  {isProfessor && (
                    <div className="botones mb-2">
                      <a className="clase-boton" href="/ejercicio/nuevo">
                        <i className="icon-plus"></i>
                        <span>Nuevo Ejercicio</span>
                      </a>
                      <a className="clase-boton" href="/reporte/calificaciones">
                        <i className="icon-chart-bar"></i>
                        <span>Calificaciones</span>
                      </a>
                      <a className="clase-boton boton-editar-clase" href="/aula/editar">
                        <i className="icon-pencil"></i>
                        <span>Editar Clase</span>
                      </a>
                    </div>
                  )}

                  {/* Lista de ejercicios */}
                  <div
                    id={isProfessor ? "lista-ejercicios-profesor" : "lista-ejercicios"}
                    className="lista-ejercicios"
                  >
                    {exercises.map((ejercicio) => (
                      <div key={ejercicio.id} className="ejercicio col-12">
                        <i className="circulo icon-circle-empty icono-accent"></i>
                        <p className="m-0 p-0">{ejercicio.name}</p>
                        <p className="fecha my-0 p-0">{ejercicio.dueDate}</p>
                        <a
                          className="icon-right"
                          href={`/ejercicio/${ejercicio.id}`}
                        ></a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
