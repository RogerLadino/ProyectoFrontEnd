import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importamos useLocation
import axios from 'axios';
import './ResetPassword.css';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener el state de la navegación
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Obtenemos el token de restablecimiento de la ubicación
  const resetToken = location.state?.token;

  // 1. Verificación inicial del token
  useEffect(() => {
    // Si no hay token en el estado, redirigir al usuario al flujo de recuperación
    if (!resetToken) {
        setMessage({ type: 'warning', text: 'Token de restablecimiento no encontrado. Inicia el proceso de recuperación de nuevo.' });
        // Redirigir después de un tiempo para que el usuario pueda leer el mensaje
        setTimeout(() => navigate('/recover-password'), 3000); 
    }
  }, [resetToken, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    
    // 2. Validación en el cliente (que las contraseñas coincidan)
    if (password !== confirmPassword) {
      setMessage({ type: 'danger', text: "Las contraseñas no coinciden." });
      return;
    }
    
    if (!resetToken) {
        setMessage({ type: 'danger', text: "Error de seguridad: Falta el token." });
        return;
    }

    setLoading(true);

    try {
      // 3. Petición POST a la API para restablecer la contraseña
      // La API necesita el token, la nueva contraseña, y posiblemente el email (aunque el token debe contenerlo)
      const response = await axios.post('/api/reset-password', {
        token: resetToken, // El token de verificación
        newPassword: password, // La nueva contraseña
      });

      console.log('Restablecimiento exitoso:', response.data);
      
      setMessage({ type: 'success', text: 'Contraseña restablecida con éxito. Redirigiendo a iniciar sesión.' });
      
      // 4. Redirigir al login después del cambio exitoso
      setTimeout(() => navigate('/login'), 2000);

    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      
      let errorMessage = 'Hubo un error al intentar restablecer la contraseña.';
      
      if (error.response) {
        // El servidor devuelve un error, por ejemplo, si el token expiró o es inválido (400)
        errorMessage = error.response.data?.message || 'Token inválido o expirado. Intenta recuperar de nuevo.';
      }
      
      setMessage({ type: 'danger', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  // Ocultar el formulario si no hay token mientras esperamos la redirección
  if (!resetToken) {
      return (
        <div className="container text-center mt-5">
            <h2 className="text-warning">Verificando seguridad...</h2>
            {message && (
                <div className={`alert alert-${message.type} mt-3 mx-auto col-md-6`} role="alert">
                  {message.text}
                </div>
            )}
        </div>
      );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">

          <div className="logo text-center">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="circle"></div>
              <span>Nombre</span>
            </Link>
          </div>

          <h2 className="text-center">Restablecer Contraseña</h2>

          {/* Mensajes de Estado */}
          {message && (
              <div className={`alert alert-${message.type} mt-3 mb-4`} role="alert">
                {message.text}
              </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="input-label form-label" htmlFor='newPassword'>
                <span className="circle-empty"></span> Nueva Contraseña
              </label>
              <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required 
              />
            </div>

            <div className="mb-4">
              <label className="input-label form-label" htmlFor='confirmPassword'>
                <span className="circle-empty"></span> Repetir Nueva Contraseña
              </label>
              <input 
                type="password" 
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary submit-btn w-100" // Usamos btn-primary y w-100
              disabled={loading || !password || password !== confirmPassword}
            >
              {loading ? (
                  <>
                    <span 
                    className="spinner-border spinner-border-sm me-2" 
                    role="status" 
                    aria-hidden="true">
                    </span>{' '}
                    Cambiando...
                  </>
                ) : (
                  'Restablecer Contraseña'
                )}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;