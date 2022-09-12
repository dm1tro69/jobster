import React from 'react';

const FormRowSelect = ({labelText, name, value, handleChange, list}) => {
    return (
        <div className={'form-row'}>
            <label htmlFor={name}>
                {labelText || name}
            </label>
            <select
                className={'form-select'}
                value={value}
                onChange={handleChange}
                name={name}
            >
                {list.map((item, i) => {
                    return <option key={i} value={item}>{item}</option>
                })}
            </select>
        </div>
    );
};

export default FormRowSelect;
