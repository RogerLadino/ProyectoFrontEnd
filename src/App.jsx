import ClassroomProvider from './context/Classroom/ClassroomProvider'
import { ExerciseProvider } from './context/Exercise/ExerciseProvider'
import { Navigation } from './navigation/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/clases.css'
import './styles/general.css';
import './styles/styles.css';
import './styles/navigation.css';
function App() {
  return (
    <ClassroomProvider>
    <ExerciseProvider>
      <Navigation />
    </ExerciseProvider>
    </ClassroomProvider>
  )
}

export default App
