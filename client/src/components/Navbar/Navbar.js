import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../media/logo.png';

const Navbar = ({ setIsLoggedIn }) => {
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = (event) => {
        if (isLoggedIn) {
            event.preventDefault(); // Prevent navigation
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        }
    };

    return (
        <nav className={styles.nav}>
            <NavLink to="/"><img className={styles.logo} src={logo} alt="Logo" /></NavLink>
            <div className={styles.links}>
                <NavLink exact className={styles.link} activeClassName={styles.active} to="/protected">Self Audit Mini</NavLink>
                {isLoggedIn ? (
                    <button className={styles.button} onClick={handleLogout}>Logout</button>
                ) : (
                    <NavLink exact className={styles.link} activeClassName={styles.active} to="/login">Login</NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;