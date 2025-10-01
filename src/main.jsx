import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ClassroomProvider from "./context/Classroom/ClassroomProvider.jsx";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/clases.css"; 
import './styles/general.css';
import './styles/styles.css';
import './styles/navigation.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClassroomProvider>
    <App />
    </ClassroomProvider>
  </StrictMode>,
);
