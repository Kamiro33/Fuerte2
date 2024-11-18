import React, { useState } from 'react';
import api from '../../Services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  if (goal.trim()) {
    try {
      const response = await api.post('/goals', { goal }); // Cambia '/goals' al endpoint real
      onSave(response.data); // Actualiza el estado en el componente padre con la meta creada
      setGoal('');
    } catch (error) {
      console.error('Error al guardar la meta:', error);
      alert('No se pudo guardar la meta.');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Escribe tu meta"
      />
      <button type="submit">Agregar Meta</button>
    </form>
  );
}

export default GoalForm;