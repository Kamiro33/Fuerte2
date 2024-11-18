import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import EditUserPlan from './EditUserPlan';
import UserProgressView from './UserProgressView';
import api from '../../Services/api';

function CoachDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/assigned');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    window.location.href = '/';
  };

  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  if (!roles.includes('ROLE_COACH')) {
    return <p>No tienes permiso para acceder a esta página.</p>;
  }

  return (
    <div>
      <h1>Panel de Entrenador</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <div style={{ display: 'flex', gap: '20px' }}>
        <UserList users={users} onSelectUser={setSelectedUser} />
        {selectedUser ? (
          <div style={{ flex: 2 }}>
            <EditUserPlan user={selectedUser} />
            <UserProgressView userId={selectedUser.id} />
          </div>
        ) : (
          <p>Selecciona un usuario para ver su información.</p>
        )}
      </div>
    </div>
  );
}

export default CoachDashboard;