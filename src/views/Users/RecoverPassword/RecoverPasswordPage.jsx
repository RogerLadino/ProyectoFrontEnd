import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importamos Axios
import './RecoverPassword.css';

// Constante para la longitud del código (6 dígitos)
const CODE_LENGTH = 6;

function RecoverPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(new Array(CODE_LENGTH).fill('')); // Estado para los 6 inputs
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('sendCode'); // 'sendCode' o 'verifyCode'

  // Ref para manejar el enfoque entre los inputs del código
  const inputRefs = React.useRef([]);

  // Combina los 6 inputs del array en una sola cadena de código
  const fullCode = verificationCode.join('');

  // --- Manejo del Código de Verificación ---

  const handleCodeChange = (e, index) => {
    const { value } = e.target;
    if (/\D/.test(value)) return; // Solo permitir números
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Mover el foco al siguiente input automáticamente
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
    // Mover el foco al input anterior si se borra el contenido
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Manejar el retroceso (Backspace) para moverse hacia atrás
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  // --- Lógica de la API con Axios ---

  const handleSendCode = async (event) => {
    event.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      // 1. Llamada a la API para solicitar el envío del código
      const response = await axios.post('/api/recover/send-code', { email });

      // Éxito:
      setMessage({ type: 'success', text: response.data.message || 'Código enviado. Revisa tu correo.' });
      setStep('verifyCode'); // Avanzar al paso 2
      
      // Enfocar el primer input del código
      setTimeout(() => inputRefs.current[0].focus(), 100);

    } catch (error) {
      console.error('Error al enviar código:', error);
      const msg = error.response?.data?.message || 'Error al enviar código. Verifica el email.';
      setMessage({ type: 'danger', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();

    if (fullCode.length !== CODE_LENGTH) {
      setMessage({ type: 'danger', text: 'El código debe tener 6 dígitos.' });
      return;
    }

    setMessage(null);
    setLoading(true);

    try {
      // 2. Llamada a la API para verificar el código
      const response = await axios.post('/api/recover/verify-code', { 
        email, 
        code: fullCode 
      });

      // Éxito: La API debe retornar un token de restablecimiento o similar
      console.log('Verificación exitosa:', response.data);

      setMessage({ type: 'success', text: 'Código verificado. Redirigiendo...' });
      
      // Pasar datos al componente de reset, si es necesario (ej. un token de verificación)
      navigate('/reset-password', { state: { token: response.data.resetToken } });

    } catch (error) {
      console.error('Error al verificar código:', error);
      const msg = error.response?.data?.message || 'Código incorrecto o expirado.';
      setMessage({ type: 'danger', text: msg });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container text-center col-12 col-md-8 col-lg-6 col-xl-4"> {/* Añadí clases de Bootstrap para centrar el contenido y limitar el ancho */}
        
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="circle"></div>
            <span>Nombre</span>
          </Link>
        </div>

        <h2 className="mb-2">Recuperar Contraseña</h2>
        <p className="description mb-3">
          Se te enviará un código de {CODE_LENGTH} dígitos a tu correo. Ingresa este código para recuperar tu cuenta.
        </p>

        {/* Mensajes de Estado */}
        {message && (
            <div className={`alert alert-${message.type} mt-3 mb-4`} role="alert">
              {message.text}
            </div>
        )}

        <form onSubmit={step === 'sendCode' ? handleSendCode : handleVerifyCode}>
          
          {/* Campo Email */}
          <label htmlFor="recovery-email" className="input-label">
            <span className="circle-empty"></span> Email
          </label>
          <div className="input-container mb-4">
            <input 
              type="email" 
              id="recovery-email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={step === 'verifyCode' || loading} // Deshabilitamos si ya se envió el código o está cargando
              required 
            />
          </div>

          {/* Sección del Código de Verificación */}
          <div className="code-section">
             <label className="input-label" htmlFor="verificationCode0">
          <span className="circle-empty"></span> Código de verificación
        </label>
      <div className="code-inputs d-flex justify-content-center gap-2 mb-4">
        {verificationCode.map((digit, index) => (
      <input 
          key={digit.id}
          id={`verificationCode${index}`}   // id único por cada input
          type="text" 
          maxLength="1" 
          className="form-control text-center p-2"
          disabled={step === 'sendCode' || loading}
          required
         value={digit}
          onChange={(e) => handleCodeChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={el => inputRefs.current[index] = el}
          style={{ width: '40px' }}
        />
          ))}
          </div>
          </div>

          <div className="button-group d-grid"> {/* d-grid para que el botón ocupe cada parte de el ancho */}
            {/* Botón ENVIAR CÓDIGO (Solo en el paso 1) */}
            {step === 'sendCode' && (
              <button 
                type="submit" 
                className="btn btn-primary submit-btn" // Usa btn-primary de Bootstrap
                disabled={loading || !email}
              >
                {loading ? (
                  <>
                    <span 
                    className="spinner-border spinner-border-sm me-2" 
                    role="status" 
                    aria-hidden="true">
                    </span>{''}
                    Enviando...
                  </>
                ) : (
                  'Enviar Código'
                )}
              </button>
            )}

            {/* Botón VERIFICAR CÓDIGO (Solo en el paso 2) */}
            {step === 'verifyCode' && (
              <button 
                type="submit" 
                className="btn btn-success verify-btn" // Usa btn-success de Bootstrap
                disabled={loading || fullCode.length !== CODE_LENGTH} // Desactivar si el código está incompleto
              >
                {loading ? (
                  <>
                    <span 
                    className="spinner-border spinner-border-sm me-2" 
                    role="status" 
                    aria-hidden="true">
                    </span>{''}
                    Verificando...
                  </>
                ) : (
                  'Verificar Código'
                )}
              </button>
            )}
          </div>
        </form>
        
        {/* Opción para re-enviar el código (opcional) */}
        {step === 'verifyCode' && !loading && (
            <button 
                className="btn btn-link mt-3" 
                onClick={() => {
                    setStep('sendCode'); 
                    setMessage(null);
                    setVerificationCode(new Array(CODE_LENGTH).fill(''));
                }}
            >
                Cambiar Email o Re-enviar Código
            </button>
        )}
      </div>
    </div>
  );
}

export default RecoverPasswordPage;
