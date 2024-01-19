import React from 'react';

const RadioInput = ({ name, options, value, onChange }) => {
    return (
        options.map((option, index) => (
            <div key={index}>
                <input type="radio" name={name} value={option} checked={value === option} onChange={onChange} />
                <label>{option}</label>
            </div>
        ))
    );
}

export default RadioInput;