import { useEffect, useState } from "react";
import DataContext from "./DataContext";

export const DataProvider = ({ children }) => {
    const [skus, setSkus] = useState([]);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        const savedSkus = JSON.parse(localStorage.getItem("skus") || "[]");
        const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        setSkus(savedSkus);
        setOrders(savedOrders);
    }, []);

    useEffect(() => {
        localStorage.setItem("skus", JSON.stringify(skus));
    }, [skus]);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const addSku = (newSku) => {
        const newEntry = { ...newSku, id: Date.now() };
        const updated = [...skus, newEntry];
        setSkus(updated);
    };

    const editSku = (updatedSku) => {
        const updated = skus.map((sku) =>
            sku.id === updatedSku.id ? updatedSku : sku
        );
        setSkus(updated);
    };

    const addOrder = (newOrder) => {
        const newEntry = { ...newOrder, id: Date.now() };
        const updated = [...orders, newEntry];
        setOrders(updated);
    };

    const editOrder = (updatedOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
            )
        );
    };

    const editMultipleOrders = (ids, status) => {
        const updated = orders.map((order) =>
            ids.includes(order.id) && order.status === "New"
                ? { ...order, status }
                : order
        );
        setOrders(updated);
        localStorage.setItem("orders", JSON.stringify(updated));
    };




    return (
        <DataContext.Provider
            value={{
                skus,
                setSkus,
                orders,
                setOrders,
                addSku,
                editSku,
                addOrder,
                editOrder,
                editMultipleOrders,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

