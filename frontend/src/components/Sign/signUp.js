import Loading from 'react-loading';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sign.css';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;



function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage('');

    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Email and password fields are required');
      return;
    }

    if (!email.endsWith('@surrey.ac.uk')) {
      setErrorMessage('Email must end with "@surrey.ac.uk"');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    setErrorMessage('');
    
    try {
      const res = await axios.post('http://localhost:8080/api/signup', { email, password });
      console.log(res.data);
      localStorage.setItem('token', res.data.token); // Store the JWT token
      setErrorMessage(res.data.message);
      setMessage('Please verify your account via email...');
      setTimeout(() => {
        navigate('/signin')
        setIsLoading(false);
      }, 5000);
      
    } catch (error) {
      console.log(error.message);
      setErrorMessage("could not connect");
    }
  };


  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        {isLoading && <Loading />}
        {message && <div>{message}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
