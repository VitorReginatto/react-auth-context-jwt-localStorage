import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    // Se está autenticado, redireciona para o Dashboard
    return <Navigate to="/dashboard" />;
  }

  // Se não está autenticado, renderiza o componente filho (ex: Login)
  return children;
};

export default PublicRoute;