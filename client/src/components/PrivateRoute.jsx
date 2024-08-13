import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Authcontext';

const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth();
  const location = useLocation();

  console.log(authenticated);  // Optional: Logging for debugging

  return authenticated ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
