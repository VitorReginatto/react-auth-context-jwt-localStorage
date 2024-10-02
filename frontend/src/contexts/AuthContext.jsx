/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { api } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = async () => {
    try {
      const response = await api.get("/auth/getAuthenticatedUser");

      if (response.status !== 200) {
        throw new Error("Not authorized");
      }

      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      console.log(error.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Será chamado apenas após o try/catch terminar
    }
  };

  async function login(data) {
    try {
      const response = await api.post("/auth/signin", data);

      const token = response.data.token;

      setToken(token);
      setIsAuthenticated(true);

      localStorage.setItem("token", token);

      await getUser();
    } catch (error) {
      setErrors(error.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      getUser();
    } else {
      setLoading(false); // Caso não haja token armazenado, pode finalizar o loading aqui
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, token, errors, loading, isAuthenticated, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};