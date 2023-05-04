import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {AuthProvider}  from './AuthContext';
import SignUp from './components/Sign/signUp';
import SignIn from './components/Sign/signIn';
import Testcom from "./components/testcom";
import Homepage from "./components/Homepage/homepage";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by sending a request to the server
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8080/api/test', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        setIsAuthenticated(true);
      }).catch(error => {
        console.log(error.message);
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    console.log("Logged out")
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage isAuthenticated={isAuthenticated} handleSignOut={handleSignOut} />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/Testcom/*" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Testcom handleSignOut={handleSignOut} />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ isAuthenticated, element, ...rest }) {
  return (
    isAuthenticated ? (
      element
    ) : (
      <Navigate to="/SignIn" />
    )
  );
}

export default App;
