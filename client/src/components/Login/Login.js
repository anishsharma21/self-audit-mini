import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

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
            <form onSubmit={handleSubmit}>
                    <label>
                            Username:
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    {errorMessage && <p>{errorMessage}</p>} {/* Add this line */}
                    <button type="submit">Login</button>
            </form>
    );
};

export default Login;