import React from 'react';

const FormRow = ({name, type, value, handleChange, labelText}) => {
    return (
        <div className={'form-row'}>
            <label htmlFor={name} className={'form-label'}>
                {labelText || name}
            </label>
            <input
                className={'form-input'}
                value={value}
                name={name}
                onChange={handleChange}
                type={type}
            />
        </div>
    );
};

export default FormRow;
