import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './AttributeButtons.module.css';

const AttributeButtons = ({ attributes }) => {
    const { id: routeId } = useParams();
    const id = Number(routeId);

    return (
        <div className={styles.attributeButtons}>
            {attributes.map(attribute => {
                const isActive = attribute.id === id;

                return (
                    <Link
                        key={attribute.id}
                        to={`/protected/${attribute.id}`}
                        className={isActive ? `${styles.button} ${styles.active}` : styles.button}
                    >
                        {attribute.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default AttributeButtons;