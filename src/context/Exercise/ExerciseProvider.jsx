import { useState } from "react";
import { useExercise } from "../../hooks/useExercise";
import { ExerciseContext } from "./ExerciseContext";

export const ExerciseProvider = ({
	children}) => {
	const {
    exercises,
    currentExercise,
    getExercises,
	} = useExercise();

	return (
		<ExerciseContext.Provider
			value={{
        exercises,
        currentExercise,
        getExercises,
			}}
		>
			{children}
		</ExerciseContext.Provider>
	);
};