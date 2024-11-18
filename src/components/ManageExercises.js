import React, { useEffect, useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import { toast } from 'react-toastify';
import { getExercises, createWorkout } from '../Services/api';
import ExerciseList from './Exercises/ExerciseList';
import ExerciseForm from './Exercises/ExerciseForm';

function ManageExercises() {
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await getExercises();
        setWorkouts(response.data); // Asume que el backend retorna un array
      } catch (error) {
        toast.error('Error al cargar los ejercicios.');
        console.error(error);
      }
    };

    fetchExercises();
  }, [setWorkouts]);

  const handleAddExercise = async (exercise) => {
    console.log('Ejercicio recibido para agregar:', exercise);
    try {
      const response = await createWorkout(exercise);
      console.log('Respuesta del backend:', response.data);
      setWorkouts([...workouts, response.data]); // Agregar al estado local
      toast.success('Ejercicio agregado exitosamente.');
    } catch (error) {
      toast.error('Error al agregar el ejercicio.');
      console.error(error);
    }
  };

  const handleDeleteExercise = (id) => {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
    setWorkouts(updatedWorkouts);
    toast.info('Ejercicio eliminado.');
  };

  return (
    <div>
      <h2>Gestión de Ejercicios</h2>
      <ExerciseForm onSave={handleAddExercise} />
      <ExerciseList workouts={workouts} onDelete={handleDeleteExercise} />
    </div>
  );
}

export default ManageExercises;