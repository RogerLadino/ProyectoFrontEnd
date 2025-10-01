import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListExerciseView } from "../views/Exercise/ListExerciseView";
import CreateExerciseView from "../views/Exercise/CreateExerciseView";
import EditExerciseView from "../views/Exercise/EditExerciseView";
import { ExerciseView } from "../views/Exercise/ExerciseView";
import CreateClassroomView from "../views/Classroom/CreateClassroomView";
import EditClassroomView from "../views/Classroom/EditClassroomView";
import ListClassroomView from "../views/Classroom/ListClassroomView";
import HomePage from "../views/Users/HomePage/HomePage";
import LoginPage from "../views/Users/Login/LoginPage";
import RegisterPage from "../views/Users/Register/RegisterPage";
import RecoverPasswordPage from "../views/Users/RecoverPassword/RecoverPasswordPage";
import ResetPasswordPage from "../views/Users/ResetPassword/ResetPasswordPage";
import { CodeView } from "../views/Code/CodeView";

export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/classroom/:classroomId/exercise" element={<ListExerciseView />} />
        <Route path="/classroom/:classroomId/exercise/:exerciseId" element={<ExerciseView />} />
        <Route path="/classroom/:classroomId/exercise/create" element={<CreateExerciseView />} />
        <Route path="/classroom/:classroomId/exercise/:exerciseId/edit" element={<EditExerciseView />} />
        <Route path="/clases" element={<ListClassroomView />} />
        <Route path="/crear-clase" element={<CreateClassroomView />} />
        <Route path="/editar-clase/:id" element={<EditClassroomView />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover-password" element={<RecoverPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/classroom/:classroomId/exercise/:exerciseId/code/:userId" element={<CodeView />} />
      </Routes>
    </Router>
  );
}