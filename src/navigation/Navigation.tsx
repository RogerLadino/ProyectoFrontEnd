import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListExerciseView } from "../views/Exercise/ListExerciseView";

export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/classroom/:classroomId/exercises" element={<ListExerciseView />} />
      </Routes>
    </Router>
  );
}