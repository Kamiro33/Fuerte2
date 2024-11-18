import React, { useEffect, useState } from 'react';
import { getUserProgress } from '../../Services/api';

function ProgressStats() {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getUserProgress();
        setProgress(response.data);
      } catch (error) {
        console.error('Error al obtener el progreso del usuario:', error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div>
      <h2>Estadísticas de Progreso</h2>
      <ul>
        {progress.map((entry, index) => (
          <li key={index}>
            Fecha: {entry.date}, Peso Levantado: {entry.weightLifted}, Reps: {entry.reps}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgressStats;