import { ExerciseProvider } from './context/Exercise/ExerciseProvider'
import { Navigation } from './navigation/Navigation'

function App() {
  return (
    <ExerciseProvider>
      <Navigation />
    </ExerciseProvider>
  )
}

export default App
