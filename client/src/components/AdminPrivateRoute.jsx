import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Authcontext';

const AdminPrivateRoute = ({ children }) => {
  const { adminAuthenticated } = useAuth();
  const location = useLocation();

  console.log(adminAuthenticated);  // Logging after variable assignment

  return adminAuthenticated ? children : <Navigate to="/admin" state={{ from: location }} />;
};

export default AdminPrivateRoute;
