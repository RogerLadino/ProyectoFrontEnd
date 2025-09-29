import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // ELIMINADO: rol ya no es parte del estado
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      // NOTA: Aquí deberías asegurarte de que tu API Backend no requiera 'rol', 
      // o bien, enviar un valor fijo (ej: rol: '2' para Alumno por defecto).
      const payload = {
            ...formData,
            // Ejemplo de envío de un rol fijo si es necesario:
            // rol: '2' 
      };

      const response = await axios.post('/api/register', payload);

      console.log('Registro exitoso:', response.data);

      setMessage({ type: 'success', text: '¡Registro exitoso! Redirigiendo a iniciar sesión...' });
      
      setTimeout(() => navigate('/login'), 2000); 

    } catch (error) {
      console.error('Error de registro:', error);

      let errorMessage = 'Hubo un error de red o del servidor. Inténtalo de nuevo.';
      
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; 
        } else if (error.response.status === 400) {
            errorMessage = 'Datos inválidos. Asegúrate de que el email no esté ya registrado.';
        }
      }
      
      setMessage({ type: 'danger', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div id="register-container">
          
        <div className="header">
          <div className="circle"></div>
          <span className="brand">Nombre</span>
        </div>
        
        <h2 className="text-center">Registrarse</h2>
        
        {/* Mensajes de Estado */}
        {message && (
          <div className={`alert alert-${message.type} mt-3 mb-4`} role="alert">
            {message.text}
          </div>
        )}

        <form className="form" onSubmit={handleRegisterSubmit}>
          
          {/* CAMPO ROL ELIMINADO */}

          {/* Fila Nombres */}
          <div className="row g-3 mb-4"> 
            <div className="col-6">
              <label htmlFor="nombre1" className="form-label"><span className="dot"></span> Primer nombre</label>
              <input 
                type="text" 
                id="nombre1" 
                name="nombre1" 
                className="form-control" 
                required 
                value={formData.nombre1}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="nombre2" className="form-label"><span className="dot"></span> Segundo nombre</label>
              <input 
                type="text" 
                id="nombre2" 
                name="nombre2" 
                className="form-control"
                value={formData.nombre2}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Fila Apellidos */}
          <div className="row g-3 mb-4"> 
            <div className="col-6">
              <label htmlFor="apellido1" className="form-label"><span className="dot"></span> Primer apellido</label>
              <input 
                type="text" 
                id="apellido1" 
                name="apellido1" 
                className="form-control" 
                required 
                value={formData.apellido1}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="apellido2" className="form-label"><span className="dot"></span> Segundo apellido</label>
              <input 
                type="text" 
                id="apellido2" 
                name="apellido2" 
                className="form-control"
                value={formData.apellido2}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Campo Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label"><span className="dot"></span> Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="form-control" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Campo Contraseña */}
          <div className="mb-5"> 
            <label htmlFor="password" className="form-label"><span className="dot"></span> Contraseña</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="form-control" 
              required 
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Botón de Submit con estado de carga */}
          <button 
              type="submit" 
              className="btn w-100 submit-btn"
              disabled={loading} 
          >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registrando...
                </>
              ) : (
                'Registrarse'
              )}
          </button>
          
          <p className="footer text-center mt-3">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;