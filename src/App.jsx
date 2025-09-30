import 'bootstrap/dist/css/bootstrap.min.css';
import { ExerciseProvider } from './context/Exercise/ExerciseProvider';
import { Navigation } from './navigation/Navigation';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import RecoverPasswordPage from './pages/RecoverPassword/RecoverPasswordPage';
import ResetPasswordPage from './pages/ResetPassword/ResetPasswordPage';
import HomePage from './pages/HomePage/HomePage';
import styles from './Global.Styles.module.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, 
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <ExerciseProvider>
        <div className="App">
          
          <Navigation />

          <Routes>
            <Route path="/" element={<HomePage />} /> 
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recover-password" element={<RecoverPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Si estás usando Navigate para manejar la ruta por defecto o error 404, 
               ahora funcionará: */}
          </Routes>
          
        </div>
      </ExerciseProvider>
    </Router>
  );
}

export default App;
