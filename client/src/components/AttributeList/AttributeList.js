import React from 'react';
import { Link } from 'react-router-dom';

const AttributeList = ({ attributes }) => {
    return (
        <div>
            {attributes.map(attribute => (
                <Link key={attribute.id} to={`/protected/${attribute.id}`}>
                    {attribute.name}
                </Link>
            ))}
        </div>
    );
};

export default AttributeList;