import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ProgressChart({ data }) {
  console.log('Datos recibidos para el gráfico:', data); // Depuración

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h2>Progreso del Usuario</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="duration" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressChart;