import React, { useContext, useState } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';
import ExerciseLibrary from '../Exercises/ExerciseLibrary';
import api from '../../Services/api';  // Cliente Axios

function WorkoutSchedule() {
  const { schedule, setSchedule } = useContext(WorkoutContext);  // Estado global para la rutina
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [message, setMessage] = useState('');

  const handleAddExerciseToDay = (day) => {
    if (!selectedExercise) {
      alert('Por favor selecciona un ejercicio primero.');
      return;
    }

    setSchedule({
      ...schedule,
      [day]: [...schedule[day], selectedExercise]
    });

    setSelectedExercise(null);
  };

  const handleSaveSchedule = async () => {
    try {
      await api.post('/workout-schedule', { schedule });
      setMessage('Rutina guardada exitosamente.');
    } catch (error) {
      setMessage('Error al guardar la rutina.');
      console.error('Error al guardar la rutina:', error);
    }
  };

  return (
    <div>
      <h2>Planificar Rutinas de Entrenamiento</h2>

      <ExerciseLibrary onSelectExercise={setSelectedExercise} />

      {selectedExercise && (
        <div>
          <h3>Ejercicio seleccionado: {selectedExercise.name}</h3>
          <div>
            <button onClick={() => handleAddExerciseToDay('lunes')}>Añadir a Lunes</button>
            <button onClick={() => handleAddExerciseToDay('martes')}>Añadir a Martes</button>
            <button onClick={() => handleAddExerciseToDay('miercoles')}>Añadir a Miércoles</button>
            <button onClick={() => handleAddExerciseToDay('jueves')}>Añadir a Jueves</button>
            <button onClick={() => handleAddExerciseToDay('viernes')}>Añadir a Viernes</button>
            <button onClick={() => handleAddExerciseToDay('sabado')}>Añadir a Sábado</button>
            <button onClick={() => handleAddExerciseToDay('domingo')}>Añadir a Domingo</button>
          </div>
        </div>
      )}

      <div>
        <h3>Rutina Planificada</h3>
        {Object.keys(schedule).map((day) => (
          <div key={day}>
            <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
            <ul>
              {schedule[day].map((exercise, index) => (
                <li key={index}>{exercise.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button onClick={handleSaveSchedule}>Guardar Rutina</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default WorkoutSchedule;