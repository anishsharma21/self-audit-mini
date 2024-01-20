import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import AttributeList from './AttributeList'; // Import AttributeList

const MainView = () => {
    // Dummy data
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
        <div>
            <h1>Main View</h1>
            <AttributeList attributes={attributes} /> {/* Pass the entire attribute object */}
            <Outlet /> {/* Render nested routes */}
        </div>
    );
}

export default MainView;