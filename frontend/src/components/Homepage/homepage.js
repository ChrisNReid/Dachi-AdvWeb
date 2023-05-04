import { AuthContext } from '../../AuthContext';
import { BrowserRouter as Router, Route, Switch, Link, useNavigate  } from "react-router-dom";
import React, { useContext } from 'react';



import "./homepage.css";

const Homepage = () => {
  const { isAuthenticated, handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <Link to="/SignUp">
        <button>Sign up</button>
      </Link>
      <Link to="/SignIn">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Homepage;
