import React from 'react';
import AttributeCard from './AttributeCard'; // Import AttributeCard

const MainView = () => {
    // Dummy data
    const attributes = [
        { id: 1, name: 'Sleep' },
        { id: 2, name: 'Diet' },
        { id: 3, name: 'Physical Activity' },
        // Add more attributes as needed
    ];

    return (
        <div>
            <h1>Main View</h1>
            {attributes.map(attribute => (
                <AttributeCard key={attribute.id} attribute={attribute} />
            ))}
        </div>
    );
}

export default MainView;