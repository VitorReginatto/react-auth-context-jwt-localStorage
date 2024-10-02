/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, token,logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      logout()
      navigate("/login", { replace: true });
    }
  }, [location]);


  if (loading) {
    //return <span>carregando...</span>;
    return <LoadingSpinner />;

  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  return loading ? <LoadingSpinner /> : children;
};

export default ProtectedRoute;