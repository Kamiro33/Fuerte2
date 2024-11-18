import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify'; // Importar react-toastify
import api from '../Services/api'; // Usa tu servicio Axios para conectarte al backend

function UserProgress() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // Llamada al backend para obtener datos reales
        const response = await api.get('/Progress');
        setProgressData(response.data);
        toast.success('Datos de progreso cargados exitosamente.'); // Notificación de éxito
      } catch (error) {
        console.error('Error al obtener los datos de progreso:', error);
        toast.error('Error al cargar los datos de progreso. Mostrando datos simulados.'); // Notificación de error

        // Datos simulados
        setProgressData([
          { date: '2024-11-10', weightLifted: 50, reps: 12 },
          { date: '2024-11-11', weightLifted: 55, reps: 10 },
          { date: '2024-11-12', weightLifted: 60, reps: 8 },
        ]);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div>
      <h2>Progreso del Usuario</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={progressData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weightLifted" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserProgress;