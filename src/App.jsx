import 'bootstrap/dist/css/bootstrap.min.css';
import { ExerciseProvider } from './context/Exercise/ExerciseProvider';
import { Navigation } from './navigation/Navigation';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import RecoverPasswordPage from './pages/RecoverPassword/RecoverPasswordPage';
import ResetPasswordPage from './pages/ResetPassword/ResetPasswordPage';
import {
  BrowserRouter as Router, // Use a specific name like BrowserRouter
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* ExerciseProvider can wrap everything that needs its context */}
      <ExerciseProvider>
        <div className="App">
          {/* Navigation might use Link or other router features, so it's inside the Router */}
          <Navigation /> 
          
          <Routes>
            {/* Define which component to show for each route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/recover-password" element={<RecoverPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            {/* You can add more routes here */}
            {/*<Route path="*" element={<NotFoundPage />} />*/}
          </Routes>
        </div>
      </ExerciseProvider>
    </Router>
  );
}

export default App;
