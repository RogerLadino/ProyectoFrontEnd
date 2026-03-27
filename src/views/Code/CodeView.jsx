import { useEffect, useRef, useState } from "react";
import {
  FiUser,
  FiCircle,
  FiPlayCircle,
  FiX,
  FiClock,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import AceEditor from "react-ace";
import * as signalR from "@microsoft/signalr";

// Importar lenguajes y tema de Ace
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import "../../styles/codigo.css";
import { TopBar } from "../../components/Navigation/TopBar";
import { Link, useParams } from "react-router-dom";
import { getExercisesById } from "../../services/exercises.service";
import { getSubmissionByUserId } from "../../services/submission.service";
import { getUserProfile } from "../../services/user.service";

export function CodeView() {
  const [activeTab, setActiveTab] = useState("ejercicio");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const { classroomId, exerciseId, userId } = useParams();
  const [exercise, setExercise] = useState({});
  const [submission, setSubmission] = useState({});
  const [isProfessor, setIsProfessor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exerciseData = await getExercisesById(classroomId, exerciseId);
        const submissionData = await getSubmissionByUserId(parseInt(exerciseId), parseInt(userId));
        const user = await getUserProfile(parseInt(userId))

        setIsProfessor(user.appRoleId == 1 ? true : false)
        setExercise(exerciseData);
        setSubmission(submissionData);
      } catch (e) {

      }
    }

    fetchData();
  }, [])

  const connectionRef = useRef(null);

  useEffect(() => {
    if (exerciseId == null || userId == null) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/hubs/code`)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(async () => {
        connection.on("CodeInitialized", (initialCode) => {
          if (initialCode?.sourceCode) setCode(initialCode.sourceCode);
        });

        connection.on("CodeUpdated", (updatedCode) => {
          if (updatedCode?.sourceCode) setCode(updatedCode.sourceCode);
        });

        await connection.invoke("JoinExerciseGroup", parseInt(exerciseId), parseInt(userId));
      })
      .catch((err) => console.error("❌ Error al conectar:", err));

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, []);

  const handleCodeChange = (newValue) => {
    setCode(newValue);

    if (connectionRef.current) {
      const codeDto = {
        appUserId: parseInt(userId),
        exerciseId: parseInt(exerciseId),
        sourceCode: newValue,
      };

      connectionRef.current
        .invoke("UpdateCode", codeDto)
        .catch((err) => console.error("❌ Error enviando UpdateCode:", err));
    }
  };

  return (
    <div className="codeview">
      <TopBar />

      {/* MAIN */}
      <div className="main-container">
        {/* SIDEBAR */}
        <nav className="sidebar">
          <Link
            className="nav-item"
            to={`/classroom/${classroomId}/exercise/${exerciseId}`}
          >
            <FiCircle className="icon-accent" />
            <span className="nav-item-header titulo-ejercicio">{exercise.name}</span>
          </Link>
        </nav>

        {/* CONTENT */}
        <main className="main-content">
          <div className="main-editor-container">
            {/* INFO USUARIO */}
            <div className="student-info">
              <div className="student-info-item">
                <FiCircle className="icon-warning" />
                <p className="nombre-usuario">
                {submission.appUser ? `${submission.appUser.firstName} ${submission.appUser.lastName}` : ""}
                </p>
              </div>

              {isProfessor && (
                <div className="student-info-item">
                  <FiCircle className="student-icon" />
                  <p>Resuelto: </p>
                  {submission.status == 0 ?
                    <FiX className="student-icon" />
                    : <FiCheckCircle className="student-icon" />
                  }

                  <FiCircle className="student-icon" />
                  <p>Intentos: </p>
                  <p className="attempts student-icon">
                    0
                  </p>

                  <FiCircle className="student-icon" />
                  <p>Nota: </p>
                  <input
                    type="text"
                    className="underline-input note-input"
                    placeholder={submission.grade}
                  />{" "}
                  /100

                  <FiCircle className="student-icon" />
                  <p>A tiempo: </p>
                  <FiClock className="student-icon" />
                </div>
              )}
            </div>

            <div className="editor-container">
              {/* CODE EDITOR */}
              <div className="editor-section">
                <div className="code">
                  <div className="editor-title code-title">
                    <div className="editor-title-item">
                      <FiCircle className="icon-accent" />
                      <p>Código</p>
                    </div>
                    <div className="editor-title-item">
                      <select
                        className="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="html">HTML</option>
                      </select>
                      <FiPlayCircle className="icon-accent pointer" />
                    </div>
                  </div>
                  <div className="editor-body code-textarea">
                    <AceEditor
                      mode={language}
                      theme="monokai"
                      name="code-editor"
                      fontSize={14}
                      width="100%"
                      height="300px"
                      value={code}
                      onChange={handleCodeChange}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* TABS */}
              <div className="editor-section tabs">
                <div className="editor-title exercise-title tab-container">
                  <div
                    className={`editor-title-item tab ${activeTab === "ejercicio" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("ejercicio")}
                  >
                    <FiCircle className="icon-accent" />
                    <p>Ejercicio</p>
                  </div>
                  <div
                    className={`editor-title-item tab ${activeTab === "consola" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("consola")}
                  >
                    <FiCircle className="icon-accent" />
                    <p>Consola</p>
                  </div>
                </div>

                {/* TAB CONTENT */}
                <div className="tab-content">
                  {activeTab === "ejercicio" && (
                    <div className="exercise tab-item">
                      <div className="editor-body exercise-description">
                        <p className="descripcion-ejercicio">
                          {exercise.description}
                        </p>
                        <div className="pruebas"></div>
                      </div>
                    </div>
                  )}

                  {activeTab === "consola" && (
                    <div className="console tab-item">
                      <div className="editor-body console-info">
                        <p>
                          Salida del programa:
                          <br />
                          {isProfessor ? "15" : "Hello Roger, how are you?"}
                          <br />
                          <br />
                          Prueba #1 . . . . . .{" "}
                          <FiCheckCircle className="icon-success" /> CORRECTA
                        </p>
                      </div>
                      <div className="editor-title console-title">
                        <div className="editor-title-item">
                          <p>Resuelto: </p>
                          {isProfessor ? (
                            <FiCheckCircle className="console-icon" />
                          ) : (
                            <FiX className="console-icon" />
                          )}
                          <p>A tiempo: </p>
                          <FiClock className="console-icon" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
