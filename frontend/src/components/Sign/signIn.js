import React, { useState,useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sign.css';
import { AuthContext } from '../../AuthContext';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;


function SignIn() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();


  const handleSignin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await axios.post('http://localhost:8080/api/signin', { email, password });
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`; // Set the header if the user is authenticated
      setErrorMessage(res.data.message);
      if (res.status === 200) {
        setIsAuthenticated(true);
        if (isAuthenticated===true) {
          navigate('/testcom');}

      } else {
        setErrorMessage('Failed to sign in. Please try again.');
      }
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('Failed to sign in.');
      }
      setIsAuthenticated(false);
    }
  };
 

  
  return (
    <div className="signin-container">
      <h1 className="signin-title">Sign in</h1>
      <form className="signin-form" onSubmit={handleSignin}>
        <label className="signin-label">
          Email:
          <input
            type="email"
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="signin-label">
          Password:
          <input
            type="password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>
        <br />
        {errorMessage && <div>{errorMessage}</div>}
        <button className="signin-button" type="submit">Sign in</button>
      </form>
    </div>
    );
  }
  export default SignIn;
  