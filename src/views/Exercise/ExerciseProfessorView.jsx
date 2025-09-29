import React, { useEffect, useState } from "react";
import { FaCircle, FaCode, FaPencilAlt, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import { TopBar } from "../../components/Navigation/TopBar";
import Sidebar from "../../components/Navigation/Sidebar";
import { Link, useParams } from "react-router-dom";
import { getExercisesById } from "../../services/exercises.service";
import { getSubmissions, assignGrade } from "../../services/submission.service";

const ExerciseProfessorView = () => {
  const [exercise, setExercise] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const { classroomId, exerciseId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const exerciseData = await getExercisesById(classroomId, exerciseId);
      const submissionsData = await getSubmissions(exerciseId);
      setExercise(exerciseData);
      setSubmissions(submissionsData);
    };
    fetchData();
  }, []);

  const handleGradeChange = (userId, value) => {
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.appUserId === userId
          ? { ...submission, grade: value }
          : submission
      )
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    for (const submission of submissions) {
      const grade = Number(submission.grade);
      if (grade && grade !== 0) {
        try {
          await assignGrade(exerciseId, submission.appUserId, grade);
        } catch (err) {
          console.error(`Error assigning grade to user ${submission.appUserId}:`, err);
        }
      }
    }
    alert("Grades updated successfully!");
  };

  return (
    <div className="exercise-professor-view">
      <TopBar />
      <div className="container-fluid m-0 p-0">
        <div className="row m-0 p-0">
          <Sidebar />

          <main className="col-12 col-md-10 m-0 p-4">
            <form onSubmit={handleSave}>
              <div className="exercise-header d-flex align-items-center gap-2 mb-4">
                <FaCircle className="icon-circle-empty" />
                <span className="ejercicio-titulo">{exercise.name}</span>
                <div className="title-buttons ms-auto d-flex gap-2">
                  <div className="title-button-container" style={{ minWidth: "150px" }}>
                    <button className="card-button" type="button">
                      <FaCode className="icon-code" /> Ver código
                    </button>
                  </div>
                  <div className="title-button-container" style={{ minWidth: "150px" }}>
                    <Link to={`/classroom/${classroomId}/exercise/${exerciseId}/edit`} style={{ textDecoration: 'none', width: '100%'}}>
                      <button className="card-button" type="button">
                        <FaPencilAlt className="icon-pencil" /> Editar ejercicio
                      </button>
                    </Link>
                  </div>
                  <button type="submit" className="button" style={{ minWidth: "150px" }}>
                    Guardar
                  </button>
                </div>
              </div>

              <table className="exercise-table table table-striped">
                <thead>
                  <tr className="table-header">
                    <th>Nombre</th>
                    <th>Nota</th>
                    <th>Resuelto</th>
                    <th>A tiempo</th>
                    <th>Código</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {submissions.map((submission) => (
                    <tr className="table-row usuario" key={submission.appUserId}>
                      <td>
                        <FaCircle className="icon-circle icon-warning" />{" "}
                        {submission.appUser.firstName} {submission.appUser.lastName}
                      </td>
                      <td>
                        <input
                          name={`nota-${submission.appUserId}`}
                          type="number"
                          className="underline-input note-input"
                          value={submission.grade || ""}
                          onChange={(e) => handleGradeChange(submission.appUserId, e.target.value)}
                        />
                        /100
                      </td>
                      <td>
                        <div className="checkmark">
                          {submission.status === 1 ? (
                            <FaCheck className="icon-check" />
                          ) : (
                            <FaTimes className="icon-cancel" />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="clock">
                          <FaClock className="icon-ok" />
                        </div>
                      </td>
                      <td>
                        <button type="button" className="card-button">
                          <FaCode className="icon-code" /> Ver código
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExerciseProfessorView;
