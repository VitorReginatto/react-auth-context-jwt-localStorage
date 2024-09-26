import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    // username: response.data.username,
    // email: response.data.email,
    // firstName: response.data.firstName,
    // lastName: response.data.lastName,
    // gender: response.data.gender,
    // image: response.data.image,

    <div>
      {user && (
        <div>
            <Link to="/produtos">Produtos</Link>
          <p>Profile Pic:</p>
          <img src={user.image} alt="" />
          <p>
            Username: <span> {user.username} </span>
          </p>
          <p>
            Email: <span> {user.email} </span>
          </p>
          <p>
            Full name: <span> {user.firstName + " " + user.lastName} </span>
          </p>
          <p>
            Gender: <span> {user.gender} </span>
          </p>
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
