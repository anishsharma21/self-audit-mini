import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [errorMessage, setErrorMessage] = useState(''); // Add this line

        const handleSubmit = async (e) => {
                e.preventDefault();
            
                try {
                    const response = await axios.post('http://localhost:5001/login', { username, password }, {
                        headers: {
                          'Content-Type': 'application/json'
                        }
                    });
            
                    if (response.data) {
                        console.log(response.data.token);
                        // Here you can handle what happens after successful login
                        // For example, save the JWT to localStorage and redirect the user to the home page
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