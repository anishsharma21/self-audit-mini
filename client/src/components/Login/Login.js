import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import styles from './Login.module.css';

const Login = ({ setIsLoggedIn }) => { // Add setIsLoggedIn prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { username, password });

      if (response.data) {
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true); // Update isLoggedIn state after successful login
        navigate('/protected', { replace: true });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1 className={styles.heading}>Self Audit Mini</h1>
        <div className={styles.inputGroup}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    );
};

export default Login;