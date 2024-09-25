import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  //const { user, logout, isAuthenticated } = useAuth();
  const { user,logout, isAuthenticated } = useContext(AuthContext)
  return (
    <>
    <div>
      <h2>Dashboard</h2>
      <p><Link to="/teste">teste</Link></p>

      {isAuthenticated ? "Bem vindo, vc está logado":"Não está logado"}
    </div>
    <p>{user ? <h1>{user.firstName}</h1>: ''}</p>
    <p>{user && <h1>{user.firstName}</h1>}</p>

    <button onClick={logout}>Logout</button>
    </>
  );
};

export default Dashboard;