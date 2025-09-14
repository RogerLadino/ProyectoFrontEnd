import React, { useState } from 'react'
import axios from 'axios'

export const useExercise = () => {
  const [exercises, setExercises] = useState([]) 
  const [currentExercise, setCurrentExercise] = useState({}) 

  const getExercises = async (classroomId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/exercise`)

      const data = await response.json()
      
      setExercises(data)
    } catch (error) {
      console.error('Error fetching exercises:', error)
    }
  }

  return {
    exercises,
    currentExercise,
    getExercises,
  }
}
