import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListExerciseView } from "../views/Exercise/ListExerciseView";
import CreateExerciseView from "../views/Exercise/CreateExerciseView";
import EditExerciseView from "../views/Exercise/EditExerciseView";
import { ExerciseView } from "../views/Exercise/ExerciseView";
import CreateClassroomView from "../views/Classroom/CreateClassroomView";
import EditClassroomView from "../views/Classroom/EditClassroomView";
import ListClassroomView from "../views/Classroom/ListClassroomView";
import TeacherClassroomView from "../views/Classroom/TeacherClassroomView";

export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/classroom/:classroomId/exercise" element={<ListExerciseView />} />
        <Route path="/classroom/:classroomId/exercise/:exerciseId" element={<ExerciseView />} />
        <Route path="/classroom/:classroomId/exercise/create" element={<CreateExerciseView />} />
        <Route path="/classroom/:classroomId/exercise/:exerciseId/edit" element={<EditExerciseView />} />
        <Route path="/clases" element={<TeacherClassroomView />} />
        <Route path="/crear-clase" element={<CreateClassroomView />} />
        <Route path="/editar-clase/:id" element={<EditClassroomView />} />
      </Routes>
    </Router>
  );
}