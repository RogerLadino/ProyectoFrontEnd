import { useState } from "react";
import {
  FiUser,
  FiCircle,
  FiPlayCircle,
  FiX,
  FiClock,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";

import "../../styles/codigo.css";
import { TopBar } from "../../components/Navigation/TopBar";

export function CodeView() {
  const [activeTab, setActiveTab] = useState("ejercicio");

  const isProfessor = true 

  return (
    <div className="codeview">
      <TopBar />

      {/* MAIN */}
      <div className="main-container">
        {/* SIDEBAR */}
        <nav className="sidebar">
          <a
            className="nav-item"
            href={isProfessor ? "ejercicio-profesor.html" : "ejercicio.html"}
          >
            <FiCircle className="icon-accent" />
            <span className="nav-item-header titulo-ejercicio">Ejercicio 1</span>
          </a>
        </nav>

        {/* CONTENT */}
        <main className="main-content">
          <div className="main-editor-container">
            {/* INFO USUARIO */}
            <div className="student-info">
              <div className="student-info-item">
                <FiCircle className="icon-warning" />
                <p className="nombre-usuario">Roger</p>
              </div>

              {isProfessor && (
                <div className="student-info-item">
                  <FiCircle className="student-icon" />
                  <p>Resuelto: </p>
                  <FiX className="student-icon" />

                  <FiCircle className="student-icon" />
                  <p>Intentos: </p>
                  <p className="attempts student-icon">0</p>

                  <FiCircle className="student-icon" />
                  <p>Nota: </p>
                  <input
                    type="text"
                    className="underline-input note-input"
                    placeholder="0"
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
                      <select className="language-select">
                        <option value="python" defaultValue>
                          Python
                        </option>
                        <option value="javascript">JavaScript</option>
                        <option value="html">HTML</option>
                      </select>
                      <FiPlayCircle className="icon-accent pointer" />
                    </div>
                  </div>
                  <div className="editor-body code-textarea">
                    <div id="editor" className="code"></div>
                  </div>
                </div>
              </div>

              {/* TABS */}
              <div className="editor-section tabs">
                <div className="editor-title exercise-title tab-container">
                  <div
                    className={`editor-title-item tab ${
                      activeTab === "ejercicio" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("ejercicio")}
                  >
                    <FiCircle className="icon-accent" />
                    <p>Ejercicio</p>
                  </div>
                  <div
                    className={`editor-title-item tab ${
                      activeTab === "consola" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("consola")}
                  >
                    <FiCircle className="icon-accent" />
                    <p>Consola</p>
                  </div>
                  <div
                    className={`editor-title-item tab ${
                      activeTab === "ayuda" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("ayuda")}
                  >
                    <FiCircle className="icon-accent" />
                    <p>Ayuda</p>
                  </div>
                </div>

                {/* TAB CONTENT */}
                <div className="tab-content">
                  {activeTab === "ejercicio" && (
                    <div className="exercise tab-item">
                      <div className="editor-body exercise-description">
                        <p className="descripcion-ejercicio">
                          Aquí va la descripción del ejercicio.
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

                  {activeTab === "ayuda" && (
                    <div className="analysis tab-item">
                      <div className="messages"></div>
                      <form className="chat">
                        <input
                          className="chat-input"
                          type="text"
                          placeholder="Escribe un texto aquí"
                        />
                        <button className="chat-submit" type="submit">
                          <FiSend />
                        </button>
                      </form>
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
