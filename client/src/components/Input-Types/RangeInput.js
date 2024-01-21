import React from 'react';

const RangeInput = ({ min, max, step, value, onChange }) => {
    return (
        <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} />
    );
}

export default RangeInput;