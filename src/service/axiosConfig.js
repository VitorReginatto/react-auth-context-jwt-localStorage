// axiosConfig.js
import axios from 'axios';

// Função para criar uma instância de axios
export const api = axios.create({
  baseURL: "https://api.example.com",
});

// Interceptor para adicionar o token do localStorage a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');  // Pega o token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Inclui o token no cabeçalho
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);