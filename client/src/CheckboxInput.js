import React from 'react';

const CheckboxInput = ({ checked, onChange }) => {
    return (
        <input type="checkbox" checked={checked} onChange={onChange} />
    );
}

export default CheckboxInput;