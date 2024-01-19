import React from 'react';
import { Link } from 'react-router-dom';

const AttributeCard = ({ attribute }) => {
    return (
        <div>
            <Link to={`/attribute/${attribute.id}`}>
                <h2>{attribute.name}</h2>
            </Link>
        </div>
    );
}

export default AttributeCard;