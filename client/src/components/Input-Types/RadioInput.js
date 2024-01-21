import React from 'react';
import styles from './RadioInput.module.css';

const RadioInput = ({ name, options, value, onChange }) => {
    return (
        <div className={styles.radioContainer}>
            {options.map((option, index) => (
                <div key={index} className={`${styles.radioOption} ${value === option ? styles.selected : ''}`}>
                    <input type="radio" id={`${name}${index}`} name={name} value={option} checked={value === option} onChange={onChange} />
                    <label htmlFor={`${name}${index}`}>{option}</label>
                </div>
            ))}
        </div>
    );
}

export default RadioInput;