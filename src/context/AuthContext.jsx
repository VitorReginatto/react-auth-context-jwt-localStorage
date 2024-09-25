import React, { createContext, useState, useEffect, useContext, navigate } from 'react';
import axios from 'axios';
import { useNavigate, Router } from 'react-router-dom';
import { api } from '../service/axiosConfig'


export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Adicionando estado de carregamento
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      console.log('Token stored', storedToken)
      setToken(storedToken);
      // setIsAuthenticated(true);
      console.log(isAuthenticated)
      fetchUserDetails(storedToken);
      setLoading((prev) => prev = false)
    } else {
      setLoading((prev) => prev = false)
      navigate('/login');
    }
  }, []); //Somente executado uma vez

  async function sigIn(username, password) {
    console.log(username)
    console.log(password)
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', { username, password, "expiresInMins": 30 }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      );
      console.log(response)
      const { accessToken } = response.data;
      setToken(accessToken);
      localStorage.setItem('jwtToken', accessToken);
      // setIsAuthenticated((prevState) => prevState = true);
      fetchUserDetails(accessToken);
      api.defaults.headers['Authorization'] = `Bearer ${accessToken}`
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      //setIsAuthenticated(false);
    }
  };


  async function fetchUserDetails(token) {
    try {
      const response = await api.get('https://dummyjson.com/auth/me', {});
      console.log(response.data)
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
    }
  };

  async function logout() {
    setToken(null);
    //setIsAuthenticated(false);
    localStorage.removeItem('jwtToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, sigIn, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

//export const useAuth = () => useContext(AuthContext);
