import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const aulas = [
    { idAula: 1, nombre: "Matemáticas" },
    { idAula: 2, nombre: "Historia Universal" },
    { idAula: 3, nombre: "Física" },
  ];

  const truncate = (text, length = 9) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <aside className="col-2 sidebar d-none d-md-flex">
      <nav className="side-nav h-100">
        <ul className="list-unstyled">
          <i className="divisor"></i>
          <li className="nav-item home">
            <Link to="/inicio">
              <i className="icon-home"></i>
              <span>Inicio</span>
            </Link>
          </li>
          <i className="divisor"></i>

          {aulas.map((aula) => (
            <li className="nav-item class1" key={aula.idAula}>
              <div className="class-icon">
                <i className="empty-square"></i>
              </div>
              <Link to={`/classroom/${aula.idAula}`}>
                {truncate(aula.nombre)}
              </Link>
            </li>
          ))}

          <li className="nav-item class1 mt-auto">
            <Link to="/">Cerrar sesión</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
