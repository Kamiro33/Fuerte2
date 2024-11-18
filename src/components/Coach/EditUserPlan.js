import React, { useState, useEffect } from 'react';
import api from '../../Services/api';

function EditUserPlan({ user }) {
  const [schedule, setSchedule] = useState({
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
    domingo: [],
  });

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await api.get(`/users/${user.id}/plan`);
        setSchedule(response.data.schedule);
      } catch (error) {
        console.error('Error al obtener el plan del usuario:', error);
      }
    };

    fetchUserPlan();
  }, [user]);

  const handleSavePlan = async () => {
    try {
      await api.put(`/users/${user.id}/plan`, { schedule });
      alert('Plan guardado exitosamente.');
    } catch (error) {
      console.error('Error al guardar el plan:', error);
      alert('Error al guardar el plan.');
    }
  };

  return (
    <div style={{ flex: 2 }}>
      <h2>Plan de Entrenamiento para {user.name}</h2>
      {Object.keys(schedule).map((day) => (
        <div key={day}>
          <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
          <ul>
            {schedule[day].map((exercise, index) => (
              <li key={index}>
                {exercise.name} ({exercise.type})
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSavePlan}>Guardar Plan</button>
    </div>
  );
}

export default EditUserPlan;