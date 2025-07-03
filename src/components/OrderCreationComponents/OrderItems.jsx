import React from "react";
import QtyButton from "../QtyButton";
import Dropdown from "../Dropdown";

const OrderItemsForm = ({
    searchTerm,
    filteredSkus,
    onSearch,
    onAddItem,
    orderItems,
    onUpdateQty,
    formError,
    totalAmount,
    onLoadMore,
}) => {


    return (
        <div className="m-6">
            <h3 className="text-md font-semibold mb-2">Order Items</h3>

            <Dropdown
                value={searchTerm}
                onSearch={onSearch}
                options={filteredSkus}
                onSelect={onAddItem}
                onLoadMore={onLoadMore}
                placeholder="Search SKU to add"
                renderItem={(sku) => `${sku.name} (${sku.code}) - ₹${sku.price}`}
            />
            {formError && <p className="text-red-500 text-xs mb-2">{formError}</p>}

            <div className="space-y-3">
                {orderItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border p-2 rounded">
                        <div className="flex flex-col w-1/4">
                            <span className="font-semibold">{item.name}</span>
                            <span className="text-xs text-gray-500">{item.code}</span>
                        </div>
                        <div className="w-1/5">₹{item.price}</div>
                        <div className="w-1/4">
                            <QtyButton quantity={item.quantity} setQuantity={(q) => onUpdateQty(i, q)} />
                        </div>
                        <div className="w-1/5 text-right">
                            Subtotal: ₹{item.subtotal.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-right font-bold text-lg">
                Total: ₹{totalAmount.toFixed(2)}
            </div>
        </div>
    );
};

export default OrderItemsForm;
