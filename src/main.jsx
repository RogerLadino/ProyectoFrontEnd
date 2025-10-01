import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ClassroomProvider from "./context/Classroom/ClassroomProvider.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClassroomProvider>
      <App />
    </ClassroomProvider>
  </StrictMode>,
);
