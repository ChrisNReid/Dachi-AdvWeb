
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:8080/api/test', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);


  const handleSignOut = (navigate) => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/homepage');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
