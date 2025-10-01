import React from "react";

export const TopBar = () => {
  return (
    <nav className="navbar w-100 navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <a href="/clases" className="logo-link navbar-brand">
          <div className="app-logo"></div>
          <h1 className="app-name">Nombre</h1>
        </a>
      </div>
    </nav>
  );
};