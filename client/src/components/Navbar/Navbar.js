import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setIsLoggedIn }) => { // Add setIsLoggedIn prop
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false); // Update isLoggedIn state after logout
    };

    return (
        <nav>
            {isLoggedIn ? (
                <>
                    <Link to="/protected">Self Audit Mini</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    {/* <Link to="/register">Register</Link> */}
                </>
            )}
        </nav>
    );
};

export default Navbar;