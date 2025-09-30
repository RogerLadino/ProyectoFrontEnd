import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <p>¿Listo para empezar?</p>
      <Link to="/register" className="registro-btn">Regístrate</Link>
    </footer>
  );
}

export default Footer;