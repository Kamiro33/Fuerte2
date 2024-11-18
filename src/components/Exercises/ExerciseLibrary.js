import React, { useState, useEffect } from 'react';
import api from '../../Services/api';

function ExerciseLibrary({ onSelectExercise }) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await api.get('/exercises'); // Cambia '/exercises' al endpoint real
        setExercises(response.data);
      } catch (error) {
        console.error('Error al cargar los ejercicios:', error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div>
      <h2>Biblioteca de Ejercicios</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id} onClick={() => onSelectExercise(exercise)}>
            {exercise.name} ({exercise.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseLibrary;