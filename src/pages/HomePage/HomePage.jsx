import React from 'react';
import './HomePage.css'

function HomePage() {
  // Las etiquetas <head> y <body> no se incluyen en los componentes.
  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          {/* Se cambió la clase 'circle' para usar la que definiste '.small-circle' */}
          <div className="small-circle"></div> 
          <span>Nombre</span>
        </div>
        <div className="topbar-right">
          {/* Los a href deberían ser reemplazados por el componente <Link> de tu router, 
              pero por ahora se dejan como <a> */}
          <a href="/login" className="small-btn">Iniciar Sesión</a>
          <a href="/register" className="small-btn">Registrarse</a>
        </div>
      </div>

      <main className="homepage container">
        <header className="hero">
          <div className="header-text">
            <h1>Evalúa mejor,<br /> más rápido, <br /> más justo</h1>
            <a href="/register" className="cta-btn">Regístrate</a>
          </div>
          <div className="big-circle"></div> {/* Se usó directamente .big-circle */}
        </header>

        <section className="advantages">
          <section className="ventajas">
            <h2>Ventajas</h2>
            <div className="ventaja-items">

              <div className="ventaja-item">
                <div className="icono">
                  {/* Atributos SVG en camelCase */}
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff7e73" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="1" width="22" height="22" rx="5" ry="5" stroke="#ff7e73" fill="none" />
                    <polyline points="9 11 12 14 22 4" />
                  </svg>
                </div>
                <p>Asigna ejercicios rápidamente</p>
              </div>

              <div className="ventaja-item">
                <div className="icono">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff7e73" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <p>Codificalos directamente</p>
              </div>

              <div className="ventaja-item">
                <div className="icono">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff7e73" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
                <p>Observa el código de tus alumnos</p>
              </div>

            </div>
          </section>
        </section>

        <section className="editor">
          <h2>Editor De Código</h2>
          <div className="editor-box">
            {/* Ruta directa desde la carpeta 'public' */}
            <img src="/img/img1.png" alt="Editor de código" />
          </div>
        </section>

        <section className="tasks">
          <h2>Tareas</h2>
          <div className="task-box">
            {/* Ruta directa desde la carpeta 'public' */}
            <img src="/img/img2.png" alt="Editor de código" />
          </div>
        </section>

        <section className="editor">
          <h2>Reportes</h2>
          <div className="task-box">
            {/* Ruta directa desde la carpeta 'public' */}
            <img src="/img/img3.png" alt="Editor de código" />
          </div>
        </section>

        <footer>
          <p>¿Listo para empezar?</p>
          <a href="/register" className="registro-btn">Regístrate</a>
        </footer>
      </main>
    </>
  );
}

export default HomePage;