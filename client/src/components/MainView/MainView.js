import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AttributeList from '../AttributeList/AttributeList';
import styles from './MainView.module.css';
import AttributeButtons from '../AttributeButtons/AttributeButtons';

const MainView = () => {
    const location = useLocation();
    const { pathname } = location;
    const isMainView = pathname === '/protected';

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
            {isMainView ? (
                <AttributeList attributes={attributes} />
            ) : (
                <AttributeButtons attributes={attributes} />
            )}
            <Outlet />
        </div>
    );
}

export default MainView;