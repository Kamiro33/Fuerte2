import React from 'react';
import { Navigate } from 'react-router-dom';

function RoleBasedRoute({ roles, allowedRoles, children }) {
  const hasAccess = allowedRoles.some(role => roles.includes(role));

  return hasAccess ? children : <Navigate to="/" />;
}

export default RoleBasedRoute;