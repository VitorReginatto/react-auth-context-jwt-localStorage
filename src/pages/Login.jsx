import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {

  const { sigIn} = useContext(AuthContext)

  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sigIn(username, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
