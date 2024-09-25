import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const Teste = () => {

  const { user,logout, isAuthenticated } = useContext(AuthContext)

  return (
    <>
    <div>
      <h2>Teste</h2>
      {isAuthenticated ? "Bem vindo, vc está logado":"Não está logado"}
    </div>
    <p>{user ? <h1>{user.firstName}</h1>: ''}</p>
    <p>{user && <h1>{user.firstName}</h1>}</p>
    <Link to="/dashboard">dashboard</Link>

    </>
  );
};

export default Teste;