import { useEffect, useContext } from 'react'
import { ExerciseContext } from '../../context/Exercise/ExerciseContext'

export const ListExerciseView = () => {
  const { exercises, exercise, getExercises } = useContext(ExerciseContext)

  useEffect(() => {
    getExercises()
  }, [])

  return (
    <div>
      <pre>
        {exercises}
      </pre>
    </div>
  )
}
