import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListExerciseView } from "../views/Exercise/ListExerciseView";
import CreateClassroomView from "../views/Classroom/CreateClassroomView";
import EditClassroomView from "../views/Classroom/EditClassroomView";
import ListClassroomView from "../views/Classroom/ListClassroomView";
import TeacherClassroomView from "../views/Classroom/TeacherClassroomView";
// placeholder imports para otras vistas:
import ReactPlaceholder from "../views/Classroom/ListClassroomView";
export const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/classroom/:classroomId/exercises" element={<ListExerciseView />} />

        {/* rutas de aulas */}
       <Route path="/" element={<ListClassroomView />} />
        <Route path="/clases" element={<TeacherClassroomView />} />
        <Route path="/crear-clase" element={<CreateClassroomView />} />
        <Route path="/editar-clase/:id" element={<EditClassroomView />} />

      </Routes>
    </Router>
  );
}