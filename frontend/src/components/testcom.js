import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Testcom() {
  const { handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <h1>HELLOOO Protected Route Test Component</h1>
      <button onClick={() => handleSignOut(navigate)}>Sign Out</button>
    </div>
  );
}

export default Testcom;
