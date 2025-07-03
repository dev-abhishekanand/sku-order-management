import React from 'react'

const Input = ({ name, value, onChange, placeholder, type = "", className = "" }) => {
    return (
        <input
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            className={`border border-gray-300 p-2 shadow-md rounded w-full ${className}`}
        />
    );
};

export default Input