import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import LoginPage from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import Teste from '../src/pages/Teste';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicPage from './pages/Public';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
            {/* Rota pública: Redireciona para o dashboard se o usuário estiver autenticado */}
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

            {/* Rota protegida: Somente acessível por usuários autenticados */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            {/* Outra página pública (que pode ser acessada por qualquer um) */}
            <Route path="/teste" element={<Teste />} />
            <Route path="/public" element={<PublicPage />} />

            {/* Rota padrão (catch-all) */}
            <Route path="*" element={<PublicRoute><LoginPage /></PublicRoute>} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
