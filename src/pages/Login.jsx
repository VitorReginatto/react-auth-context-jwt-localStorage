import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error(error.message);
    }

    reset();
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  if (loading) {
    return <span>carregando...</span>;
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={"emilys"}
            {...register("username")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={"emilyspass"}
            {...register("password")}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Enviar"}
        </button>
      </form>
    </>
  );
};

export default Login;
