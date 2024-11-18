import React, { useState } from 'react';
import GoalForm from './GoalForm';
import GoalList from './GoalList';

function GoalTracking() {
  const [goals, setGoals] = useState([]);

  const addGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  const deleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Seguimiento de Metas</h1>
      <GoalForm onSave={addGoal} />
      <GoalList goals={goals} onDelete={deleteGoal} />
    </div>
  );
}

export default GoalTracking;