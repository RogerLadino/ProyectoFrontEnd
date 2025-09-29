import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="bg-dark p-3" style={{ minWidth: 220, height: "100vh" }}>
      <ul className="nav flex-column">
        <li className="nav-item"><Link className="nav-link text-light" to="/">Mis aulas</Link></li>
        <li className="nav-item"><Link className="nav-link text-light" to="/clases">Clases (admin)</Link></li>
        <li className="nav-item"><Link className="nav-link text-light" to="/crear-clase">Crear clase</Link></li>
      </ul>
    </aside>
  );
}
