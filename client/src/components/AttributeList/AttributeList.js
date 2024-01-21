import React from 'react';
import { Link } from 'react-router-dom';
import AttributeIcon from './AttributeIcon'; // Import AttributeIcon
import styles from './AttributeList.module.css'; // Import styles

const AttributeList = ({ attributes }) => {
    return (
        <div className={styles.attributeList}>
            {attributes.map(attribute => (
                <Link key={attribute.id} to={`/protected/${attribute.id}`} className={styles.card}>
                    <AttributeIcon name={attribute.name} /> {/* Display the icon */}
                    <h2 className={styles.title}>{attribute.name}</h2>
                </Link>
            ))}
        </div>
    );
};

export default AttributeList;