import React from 'react';
import './page.css';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  return (
    <div className="Container">
      <center>
        <h1>File Portal</h1>
      </center>
      <button className="signin close" onClick={() => handleClick('/login')}>
        Login
      </button>
    </div>
  );
};
