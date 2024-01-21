import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faAppleAlt, faRunning, faBrain, faUsers, faBook, faSwimmer, faClock } from '@fortawesome/free-solid-svg-icons';
import styles from './AttributeIcon.module.css'; // Import styles

const icons = {
    Sleep: faBed,
    Diet: faAppleAlt,
    'Physical Activity': faRunning,
    Mental: faBrain,
    Social: faUsers,
    Reading: faBook,
    'Facial Swelling': faSwimmer,
    'Deep Work Hours': faClock,
};

const AttributeIcon = ({ name }) => {
    return <FontAwesomeIcon icon={icons[name]} className={styles.icon} />; // Apply the icon class
};

export default AttributeIcon;