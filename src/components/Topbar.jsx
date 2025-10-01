import React from 'react';
import { Link } from 'react-router-dom'; // Usaremos Link para la navegación

function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="circle small-circle"></div>
        <span>Nombre</span>
      </div>
      <div className="topbar-right">
        {/* Los 'a' se reemplazan por 'Link' de React Router */}
        <Link to="/login" className="small-btn">Iniciar Sesión</Link>
        <Link to="/register" className="small-btn">Registrarse</Link>
      </div>
    </div>
  );
}

export default Topbar;