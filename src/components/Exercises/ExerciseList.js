import React from 'react';
import api from '../../Services/api';

function ExerciseList({ workouts, onDelete }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/exercises/${id}`); // Cambia '/exercises' al endpoint real
      onDelete(id); // Llama al método padre para actualizar el estado
    } catch (error) {
      console.error('Error al eliminar el ejercicio:', error);
      alert('No se pudo eliminar el ejercicio.');
    }
  };

  return (
    <div>
      <h3>Lista de Ejercicios</h3>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            {workout.name} ({workout.type})
            <button
              style={{
                marginLeft: '10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => handleDelete(workout.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;