import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, requiredRole }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Cambia según cómo determines si el usuario está autenticado
  const userRole = localStorage.getItem('role'); // Supongamos que guardas el rol en el localStorage

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirige al login si no está autenticado
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />; // Redirige si el rol no coincide
  }

  return children;
}

export default PrivateRoute;