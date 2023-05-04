import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const express = require('express');
// const app = express();


// Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// Import authentication routes
// const authRoutes = require('./auth');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
