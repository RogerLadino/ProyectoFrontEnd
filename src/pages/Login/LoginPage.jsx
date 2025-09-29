import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function LoginPage() {
  const navigate = useNavigate(); 
  const [message, setMessage] = useState(null); 
  const [loading, setLoading] = useState(false);
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault(); 
    setMessage(null); 
    setLoading(true); 

    try {
      const response = await axios.post('/api/login', credentials); 
      
      console.log('Login exitoso:', response.data);
      setMessage({ type: 'success', text: '¡Inicio de sesión exitoso! Redirigiendo...' });
      
      setTimeout(() => navigate('/'), 1500); 

    } catch (error) {
      console.error('Error de inicio de sesión:', error);

      let errorMessage = 'Hubo un error de red o del servidor. Inténtalo de nuevo.';
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; 
        }
      }
      
      setMessage({ type: 'danger', text: errorMessage });
    } finally {
      setLoading(false); 
    }
  };

  return (
    // 🛑 CAMBIO CLAVE: Añadimos un contenedor de ancho completo para anular el layout padre de Bootstrap
    <div className="w-100"> 
      <div className="login-wrapper">
        <div id="login-container"> 
          {/* Logo y Nombre */}
          <Link to="/" className="logo">
            <div className="circle"></div>
            <span className="logo-text">Nombre</span>
          </Link>

          <h1 className="text-center">Iniciar Sesión</h1>
          
          {/* Mensajes de Estado */}
          {message && (
            <div className={`alert alert-${message.type} mt-3 mb-4`} role="alert">
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleLoginSubmit}> 
            
            {/* Campo Email */} 
            <div className="mb-4 text-start">
              <label htmlFor="user-email" className="form-label">
                <span className="dot"></span>
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                className="form-control" 
                id="user-email" 
                name="email" 
                required 
                value={credentials.email} 
                onChange={handleChange}
                placeholder="nombre@ejemplo.com"
              />
            </div>
            
            {/* Campo Contraseña */}
            <div className="mb-5 text-start"> 
              <label htmlFor="user-password" className="form-label">
                <span className="dot"></span>
                <span className="label-text">Contraseña</span>
              </label>
              <input 
                type="password" 
                className="form-control" 
                id="user-password" 
                name="password" 
                required 
                value={credentials.password} 
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          
            {/* Botón de Submit */}
            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Cargando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </form>
          
          {/* Enlaces de Pie de Página */} 
          <div className="footer-links text-center"> 
            <p className="footer-text">
              ¿No tienes una cuenta? <Link to="/register">¡Regístrate!</Link>
            </p>
            <p className="footer-text">
              ¿Olvidaste tu contraseña? <Link to="/recover-password">¡Recupérala!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;