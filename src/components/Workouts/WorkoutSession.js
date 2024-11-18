import React, { useContext, useState, useEffect } from 'react';
import ExerciseLibrary from '../Exercises/ExerciseLibrary';
import { WorkoutContext } from '../../context/WorkoutContext';
import {
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from '../../Services/api';

function WorkoutSession() {
  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await getWorkouts();
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error al cargar entrenamientos:', error);
      }
    };
    fetchWorkouts();
  }, [setWorkouts]);

  const handleAddOrUpdateWorkout = async () => {
    if (!selectedExercise) return alert('Por favor selecciona un ejercicio');

    const workoutData = {
      exerciseId: selectedExercise.id,
      reps: selectedExercise.type === 'fuerza' ? reps : null,
      sets: selectedExercise.type === 'fuerza' ? sets : null,
      weight: selectedExercise.type === 'fuerza' ? weight : null,
      duration: selectedExercise.type === 'cardio' ? duration : null,
    };

    try {
      if (editingWorkout) {
        await updateWorkout(editingWorkout.id, workoutData);
        setMessage('Entrenamiento actualizado exitosamente.');
        setWorkouts((prevWorkouts) =>
          prevWorkouts.map((w) =>
            w.id === editingWorkout.id ? { ...w, ...workoutData } : w
          )
        );
        setEditingWorkout(null);
      } else {
        const response = await createWorkout(workoutData);
        setMessage('Entrenamiento registrado exitosamente.');
        setWorkouts((prevWorkouts) => [...prevWorkouts, response.data]);
      }

      setSelectedExercise(null);
      setReps('');
      setSets('');
      setWeight('');
      setDuration('');
    } catch (error) {
      setMessage('Error al procesar el entrenamiento.');
      console.error('Error:', error);
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await deleteWorkout(id);
      setMessage('Entrenamiento eliminado exitosamente.');
      setWorkouts((prevWorkouts) => prevWorkouts.filter((w) => w.id !== id));
    } catch (error) {
      setMessage('Error al eliminar el entrenamiento.');
      console.error('Error:', error);
    }
  };

  const handleEditWorkout = (workout) => {
    setSelectedExercise(workout.exercise);
    setReps(workout.reps || '');
    setSets(workout.sets || '');
    setWeight(workout.weight || '');
    setDuration(workout.duration || '');
    setEditingWorkout(workout);
  };

  return (
    <div>
      <h2>Registrar/Editar Sesión de Entrenamiento</h2>

      <ExerciseLibrary onSelectExercise={setSelectedExercise} />

      {selectedExercise && (
        <div>
          <h3>Ejercicio seleccionado: {selectedExercise.name}</h3>

          {selectedExercise.type === 'fuerza' && (
            <>
              <div>
                <label>Peso (kg):</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <label>Repeticiones:</label>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
              <div>
                <label>Series:</label>
                <input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                />
              </div>
            </>
          )}

          {selectedExercise.type === 'cardio' && (
            <div>
              <label>Duración (minutos):</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          )}

          <button onClick={handleAddOrUpdateWorkout}>
            {editingWorkout ? 'Actualizar Ejercicio' : 'Añadir Ejercicio'}
          </button>
        </div>
      )}

      <div>
        <h3>Ejercicios Registrados</h3>
        <ul>
          {workouts.map((workout, index) => (
            <li key={index}>
              {workout.exercise.name} -{' '}
              {workout.exercise.type === 'fuerza'
                ? `${workout.weight} kg, ${workout.reps} repeticiones, ${workout.sets} series`
                : `${workout.duration} minutos`}
              <button onClick={() => handleEditWorkout(workout)}>Editar</button>
              <button onClick={() => handleDeleteWorkout(workout.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default WorkoutSession;