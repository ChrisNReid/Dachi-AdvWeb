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








// // import { useHistory } from 'react-router-dom';
// import React, { useState } from 'react';
// //import axios from 'axios';

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');
// const jwt = require('jsonwebtoken');

// app.use(bodyParser.json());
// app.use(cors());

// function generateToken(email) {
//   // Logic for generating a token based on the email parameter
//   const token = jwt.sign({ email }, 'secret');
//   return token;
// }


// function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   // const history = useHistory();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setMessage(null);
 
    
//       if (!email || !password) {
//         setMessage('Please enter a valid Surrey email address');
//       }
      
//       // if (!email.endsWith('@surrey.ac.uk')) {
//       //   return res.status(400).json({ message: 'Email must end with @surrey.ac.uk' });
//       // }

//       // Validate email and password
//       const emailRegex = /^[^\s@]+@surrey\.ac\.uk$/;
//       if (!emailRegex.test(email)) {
//         setMessage('Please enter a valid Surrey university email address');
//         return;
//       }
//       if (password.length < 6) {
//         setMessage('Password must be at least 6 characters long');
//         return;
//       }

//       // Send sign-up request to backend server
//       try {
//         const response = await axios.post('/api/signup', { email, password });
//         console.log(response.data); // log response from server
//       } catch (error) {
//         console.error(error);
//         setMessage('Failed to sign up');
//       }
//     // };
          
//     //   // Here you can save the user data to a database or perform any other necessary actions
//     //   const token = generateToken(email);
//     //   // Here you can save the user data to a database or perform any other necessary actions
//     //   const user = { email, password };
//     //   axios.post('http://localhost:8080/api/signup', user) // make a POST request to the server with the data
//     //   .then(response => {
//     //     const { token } = response.data; // extract the token from the response
//     //     setMessage('User signed up successfully'); // send a response back to the client with the token
//     //   })
//     // } catch (error) {
//     //     setMessage(' user frontend') // handle errors
//     //   };
//   };

//   return (
//     <div className="signin-container">
//       <h1 className="signin-title">Sign up</h1>
//       {message && <p className="signup-success">{message}</p>}
//       <form className="signin-form" onSubmit={handleSignup}>
//         <label className="signin-label">
//           Email:
//           <input
//             type="email"
//             className="signin-input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label className="signin-label">
//           Password:
//           <input
//             type="password"
//             className="signin-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             minLength={6}
//             required
//           />
//         </label>
//         <br />
//         <button className="signin-button" type="submit">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignUp;
