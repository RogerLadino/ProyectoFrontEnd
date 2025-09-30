import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    rol: '',
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
    setLoading(true);
    setMessage(null);

    const payload = {
      idRol: parseInt(formData.rol),
      primerNombre: formData.nombre1,
      segundoNombre: formData.nombre2,
      primerApellido: formData.apellido1,
      segundoApellido: formData.apellido2,
      correoElectronico: formData.email,
      clave: formData.password
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/Auth/register`, payload);
      setMessage({ type: 'success', text: '¡Registro exitoso! Serás redirigido al inicio de sesión.' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error en el registro:', error);
      const errorMessage = error.response?.data?.message || 'Ocurrió un error. Inténtalo de nuevo.';
      setMessage({ type: 'danger', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container register-container">
      <div className="header">
        <div className="circle"></div>
        <span className="brand">Nombre</span>
      </div>
      <h2>Registrarse</h2>
      
      {message && (
        <div className={`alert alert-${message.type} mt-2`} role="alert">
          {message.text}
        </div>
      )}

      <form className="form" onSubmit={handleRegisterSubmit}>
        <div className="mb-2">
          <label htmlFor="rol" className="form-label"><span className="dot"></span> Rol</label>
          <select id="rol" name="rol" className="form-control" value={formData.rol} onChange={handleChange} required>
            <option value="" disabled>Selecciona tu rol...</option>
            <option value="1">Profesor</option>
            <option value="2">Alumno</option>
          </select>
        </div>

        <div className="row g-3 mb-2">
          <div className="col-6">
            <label htmlFor="nombre1" className="form-label"><span className="dot"></span> Primer nombre</label>
            <input type="text" id="nombre1" name="nombre1" className="form-control" value={formData.nombre1} onChange={handleChange} required />
          </div>
          <div className="col-6">
            <label htmlFor="nombre2" className="form-label"><span className="dot"></span> Segundo nombre</label>
            <input type="text" id="nombre2" name="nombre2" className="form-control" value={formData.nombre2} onChange={handleChange} />
          </div>
        </div>
        <div className="row g-3 mb-2">
            <div className="col-6">
                <label htmlFor="apellido1" className="form-label"><span className="dot"></span> Primer apellido</label>
                <input type="text" id="apellido1" name="apellido1" className="form-control" value={formData.apellido1} onChange={handleChange} required />
            </div>
            <div className="col-6">
                <label htmlFor="apellido2" className="form-label"><span className="dot"></span> Segundo apellido</label>
                <input type="text" id="apellido2" name="apellido2" className="form-control" value={formData.apellido2} onChange={handleChange}/>
            </div>
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label"><span className="dot"></span> Email</label>
          <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><span className="dot"></span> Contraseña</label>
          <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn w-100 submit-btn" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        <p className="footer">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;