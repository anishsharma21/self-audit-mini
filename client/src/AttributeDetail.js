import React from 'react';
import { useParams } from 'react-router-dom';

const AttributeDetail = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Attribute Detail for ID: {id}</h1>
        </div>
    );
}

export default AttributeDetail;