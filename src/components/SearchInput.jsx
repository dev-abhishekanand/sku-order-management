import React from 'react';

const SearchInput = ({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
    ...props
}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border border-gray-300 text-sm px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-100 ${className}`}
            {...props}
        />
    );
};

export default SearchInput;
