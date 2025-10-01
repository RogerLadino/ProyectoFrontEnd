import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyClassrooms } from "../../services/classroom.service";

const Sidebar = () => {
  const [aulas, setAulas] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const aulasData = await getMyClassrooms()

      console.log(aulasData)
      setAulas(aulasData)
    }

    fetchData()
  }, [])

  const truncate = (text, length = 9) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <aside className="col-2 sidebar d-none d-md-flex">
      <nav className="side-nav h-100">
        <ul className="list-unstyled">
          <i className="divisor"></i>
          <li className="nav-item home">
            <Link to="/">
              <i className="icon-home"></i>
              <span>Inicio</span>
            </Link>
          </li>
          <i className="divisor"></i>

          {aulas.map((aula) => (
            <li className="nav-item class1" key={aula.id}>
              <div className="class-icon">
                <i className="empty-square"></i>
              </div>
              <Link to={`/classroom/${aula.id}/exercise`}>
                {truncate(aula.name)}
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
