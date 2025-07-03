import React from 'react'

const Button = ({ onClick, children, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center justify-center gap-2
      bg-gray-500 hover:bg-gray-700 text-white shadow-md
      font-medium rounded-3xl px-4 py-2
      transition duration-200 ease-in-out
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-blue-300 hover:cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};
export default Button;