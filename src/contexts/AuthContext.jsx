/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(data) {
    try {
      const response = await api.post("/auth/login", data);

      const user = {
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        gender: response.data.gender,
        image: response.data.image,
      };

      const accessToken = response.data.accessToken;

      setToken(accessToken);
      setIsAuthenticated(true);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      //api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    } catch (error) {
      setErrors(error.message);
    }
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setToken(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
      console.log('Token Salvo com Sucesso')
      setUser(userData);
    } else {
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
      api.defaults.headers['Authorization'] = null;
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, token, errors, loading, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
