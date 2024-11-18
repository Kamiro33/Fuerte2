import React from 'react';

function UserList({ users, onSelectUser }) {
  return (
    <div style={{ flex: 1 }}>
      <h2>Usuarios Asignados</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <button onClick={() => onSelectUser(user)}>{user.name}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios asignados.</p>
      )}
    </div>
  );
}

export default UserList;