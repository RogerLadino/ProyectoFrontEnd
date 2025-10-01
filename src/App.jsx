import ClassroomProvider from './context/Classroom/ClassroomProvider'
import { Navigation } from './navigation/Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/clases.css'
import './styles/general.css';
import './styles/styles.css';
import './styles/navigation.css';

function App() {
  return (
    <ClassroomProvider>
      <Navigation />
    </ClassroomProvider>
  )
}

export default App;
