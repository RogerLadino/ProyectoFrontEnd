import React, { createContext } from 'react';

export const ExerciseContext = createContext({
	exercises: [],
	exercise: {},
	getExercises: () => {},
	getExercise: () => {},
});