import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../Services/api';

function UserProgressView({ userId }) {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await api.get(`/users/${userId}/progress`); // Endpoint para progreso del usuario
        const mappedData = response.data.map(item => ({
          date: item.fecha, // Cambia 'fecha' por la clave correcta
          weightLifted: item.pesoLevantado, // Cambia 'pesoLevantado' por la clave correcta
          duration: item.duracion // Cambia 'duracion' por la clave correcta
        }));
        setProgressData(mappedData);
      } catch (error) {
        console.error('Error al obtener los datos de progreso del usuario:', error);
      }
    };

    fetchProgressData();
  }, [userId]);

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
          <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserProgressView;