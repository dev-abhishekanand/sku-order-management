import React from 'react'

const QtyButton = ({ quantity, setQuantity }) => {
    const increase = () => setQuantity(quantity + 1);
    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className="flex items-center space-x-2">
            <button onClick={decrease} className="bg-gray-200 px-2 py-1 rounded">-</button>
            <span>{quantity}</span>
            <button onClick={increase} className="bg-gray-200 px-2 py-1 rounded">+</button>
        </div>
    );
};

export default QtyButton