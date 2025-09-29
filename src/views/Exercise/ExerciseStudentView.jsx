import React, { useEffect, useState } from "react";
import "../../styles/ejercicio.css";
import Sidebar from "../../components/Navigation/Sidebar";
import { TopBar } from "../../components/Navigation/TopBar";
import { FaRegCircle, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getExercisesById } from "../../services/exercises.service";
import { getSubmissionById } from "../../services/submission.service";

const ExerciseStudentView = () => {
  const [exercise, setExercise] = useState({})
  const [submission, setSubmission] = useState({})
  const { classroomId, exerciseId} = useParams();

  useEffect(() =>{
    const fetchData = async () => { 
      const exerciseData = await getExercisesById(classroomId, exerciseId);
      const submissionData = await getSubmissionById(exerciseId);

      setExercise(exerciseData)
      setSubmission(submissionData)
    }

    fetchData()
  }, [])

  const handleVerCodigo = () => {
    console.log("Navegar a ver código del ejercicio:", ejercicio.nombre);
  };

  return (
    <div className="container-fluid m-0 p-0">
      <TopBar />

      <div className="row m-0 p-0">
        <Sidebar />

        <main className="col-12 col-md-10">
          {/* Header */}
          <div className="exercise-header d-flex align-items-center gap-2 mb-4">
            <FaRegCircle className="icon-circle-empty" />
            <span className="ejercicio-titulo">{exercise.name}</span>
          </div>

          {/* Contenido principal */}
          <div className="exercise-container row">
            {/* Info del ejercicio */}
            <div className="exercise-content col-12 col-lg-8 mb-3">
              <p className="date-info">{exercise.dueDate}</p>
              <p className="descripcion-ejercicio">{exercise.description}</p>
            </div>

            {/* Info de la entrega */}
            <div className="exercise-info col-12 col-lg-4 mb-3">
              <table className="statistics table table-borderless">
                <tbody>
                  {/* Nota */}
                  <tr className="statistic">
                    <td className="statistic-label">
                      <FaRegCircle className="icon-circle-empty" />
                      <span>Nota</span>
                    </td>
                    <td className="score">
                      {submission.grade}
                    </td>
                  </tr>

                  {/* Resuelto */}
                  <tr className="statistic">
                    <td className="statistic-label">
                      <FaRegCircle className="icon-circle-empty" />
                      <span>Resuelto</span>
                    </td>
                    <td>
                      <div className="checkmark">
                        {submission.status == 1 ? (
                          <FaCheck className="icon-check" />
                        ) : (
                          <FaTimes className="icon-cancel" />
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* A tiempo */}
                  <tr className="statistic">
                    <td className="statistic-label">
                      <FaRegCircle className="icon-circle-empty" />
                      <span>A tiempo</span>
                    </td>
                    <td>
                      <div className="clock">
                        {submission.submittedAt <= exercise.dueDate ? (
                          <FaCheck className="icon-check" />
                        ) : (
                          <FaClock className="icon-clock" />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Botón Ver Código */}
              <button
                type="button"
                className="button w-100"
                onClick={handleVerCodigo}
              >
                Ver código
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExerciseStudentView;
