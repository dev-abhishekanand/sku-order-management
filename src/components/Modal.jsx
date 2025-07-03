import React from "react";

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn">
            <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 sm:mx-auto px-6 py-5 transition-all duration-300 ease-out">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-semibold focus:outline-none"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                {children}
            </div>
        </div>
    );
};

export default Modal;
