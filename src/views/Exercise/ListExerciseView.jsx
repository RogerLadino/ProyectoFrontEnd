import '../../styles/lista-ejercicios.css'
import { TopBar } from '../../components/Navigation/TopBar'
import Sidebar from '../../components/Navigation/Sidebar';
import { useEffect, useState } from 'react';
import { getExercisesByClassroom } from '../../services/exercises.service';
import { getClassroomById } from '../../services/classroom.service';
import { getUserProfile } from '../../services/user.service';
import { Link, useParams } from 'react-router-dom';
import { FaArrowAltCircleRight, FaChartBar, FaCircle, FaPencilAlt, FaPlusCircle } from 'react-icons/fa';

export const ListExerciseView = () => {
  const { classroomId } = useParams();
  const [exercises, setExercises] = useState([])
  const [classroom, setClassroom] = useState({})
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const fetchExercises = await getExercisesByClassroom(classroomId)
      const fetchClassroom = await getClassroomById(classroomId)
      const fetchUser = await getUserProfile()

      setExercises(fetchExercises)
      setClassroom(fetchClassroom)
      setUser(fetchUser)
    }

    fetchData()
  }, [])

  const isProfessor = user.appRoleId == 1

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
                      <Link className="clase-boton" to={`/classroom/${classroomId}/exercise/create`}>
                        <i className="icon-plus"></i>
                        <FaPlusCircle />
                        <span>Nuevo Ejercicio</span>
                      </Link>
                      <a className="clase-boton" href="/reporte/calificaciones">
                        <FaChartBar />
                        <span>Calificaciones</span>
                      </a>
                      <Link 
                        className="clase-boton boton-editar-clase" 
                        to={`/editar-clase/${classroomId}`}
                      >
                        <FaPencilAlt />
                        <span>Editar Clase</span>
                      </Link>
                    </div>
                  )}

                  {/* Lista de ejercicios */}
                  <div
                    id={isProfessor ? "lista-ejercicios-profesor" : "lista-ejercicios"}
                    className="lista-ejercicios"
                  >
                    {exercises.map((ejercicio) => (
                      <div key={ejercicio.id} className="ejercicio col-12">
                        <FaCircle className="icono-accent" />
                        <p className="m-0 p-0">{ejercicio.name}</p>
                        <p className="fecha my-0 p-0">{ejercicio.dueDate}</p>
                        <Link
                          className="icon-right"
                          to={`/classroom/${classroomId}/exercise/${ejercicio.id}`}
                        >
                          <FaArrowAltCircleRight />
                        </Link>
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
