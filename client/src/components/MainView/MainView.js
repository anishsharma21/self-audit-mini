import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import AttributeList from '../AttributeList/AttributeList'; // Import AttributeList
import styles from './MainView.module.css'; // Import styles
import AttributeButtons from '../AttributeButtons/AttributeButtons'; // Import AttributeButtons

const MainView = () => {

    const [isAttributeSelected, setAttributeSelected] = useState(false);

    const attributes = [
        { id: 1, name: 'Sleep' },
        { id: 2, name: 'Diet' },
        { id: 3, name: 'Physical Activity' },
        { id: 4, name: 'Mental' },
        { id: 5, name: 'Social' },
        { id: 6, name: 'Reading' },
        { id: 7, name: 'Facial Swelling' },
        { id: 8, name: 'Deep Work Hours' },
    ];

    return (
        <div className={styles.mainView}>
            <h1 className={styles.title}>Attributes</h1>
            {isAttributeSelected ? (
                <AttributeButtons attributes={attributes} />
            ) : (
                <AttributeList attributes={attributes} onAttributeClick={setAttributeSelected} />
            )}
            <Outlet /> {/* Render nested routes */}
        </div>
    );
}

export default MainView;