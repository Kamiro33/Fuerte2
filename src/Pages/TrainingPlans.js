import React from 'react';

function TrainingPlans() {
  const plans = [
    { id: 1, name: 'Plan para principiantes', description: 'Rutina básica para iniciarte en el gimnasio.' },
    { id: 2, name: 'Plan intermedio', description: 'Aumenta tu fuerza y resistencia.' },
    { id: 3, name: 'Plan avanzado', description: 'Entrenamiento para deportistas experimentados.' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Planes de Entrenamiento</h1>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id} style={{ marginBottom: '1rem' }}>
            <strong>{plan.name}</strong>
            <p>{plan.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainingPlans;