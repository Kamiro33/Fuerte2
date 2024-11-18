import React from 'react';
import api from '../../Services/api';

function GoalList({ goals, onDelete }) {
  const handleDelete = async (index, goalId) => {
    try {
      await api.delete(`/goals/${goalId}`); // Cambia '/goals' al endpoint real
      onDelete(index); // Actualiza el estado en el componente padre
    } catch (error) {
      console.error('Error al eliminar la meta:', error);
      alert('No se pudo eliminar la meta.');
    }
  };

  return (
    <ul>
      {goals.map((goal, index) => (
        <li key={index}>
          {goal} <button onClick={() => handleDelete(index, goal.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default GoalList;