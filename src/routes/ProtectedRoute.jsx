// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);


  if (loading) {
    console.log(loading)
    console.log('entrei')
    // Renderiza um spinner de carregamento enquanto espera a autenticação
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    // Se não está autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // Se está autenticado, renderiza o componente filho (ex: Dashboard)
  return children;
};

export default ProtectedRoute;