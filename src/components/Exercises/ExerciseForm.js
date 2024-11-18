import React, { useState } from 'react';
import api from '../../Services/api'; // Importa el cliente Axios

function ExerciseForm({ onSave }) {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseType, setExerciseType] = useState('fuerza');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!exerciseName) {
      alert('Por favor, ingresa un nombre para el ejercicio.');
      return;
    }
  
    const newExercise = { name: exerciseName, type: exerciseType };

  try {
    const response = await api.post('/exercises', newExercise); // Cambia '/exercises' al endpoint real
    console.log('Ejercicio creado:', response.data);
    onSave(response.data); // Llama a onSave con el ejercicio retornado del backend
  } catch (error) {
    console.error('Error al crear el ejercicio:', error);
    alert('Hubo un problema al crear el ejercicio.');
  }

  setExerciseName('');
  setExerciseType('fuerza');
};

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre del Ejercicio:</label>
      <input
        type="text"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
        required
      />
      <label>Tipo de Ejercicio:</label>
      <select
        value={exerciseType}
        onChange={(e) => setExerciseType(e.target.value)}
      >
        <option value="fuerza">Fuerza</option>
        <option value="cardio">Cardio</option>
      </select>
      <button type="submit">Guardar</button>
    </form>
  );
}

export default ExerciseForm;
