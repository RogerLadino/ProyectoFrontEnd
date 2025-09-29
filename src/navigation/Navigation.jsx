import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListExerciseView } from "../views/Exercise/ListExerciseView";
import CreateExerciseView from "../views/Exercise/CreateExerciseView";
import ExerciseProfessorView from "../views/Exercise/ExerciseProfessorView";

export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/classroom/:classroomId/exercise" element={<ListExerciseView />} />
        <Route path="/classroom/:classroomId/exercise/:exerciseId" element={<ExerciseProfessorView />} />
        <Route path="/classroom/:classroomId/exercise/create" element={<CreateExerciseView />} />
        <Route path="/classroom/:classroomId/exercise/:exerciseId/edit" element={<CreateExerciseView />} />
      </Routes>
    </Router>
  );
}