import { useEffect, useState } from "react";
import DataContext from "./DataContext";

const USE_API = true;
const API_URL = "http://localhost:4000";

export const DataProvider = ({ children }) => {
    const [skus, setSkus] = useState([]);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (USE_API) {
            fetch(`${API_URL}/skus`).then(res => res.json()).then(setSkus);
            fetch(`${API_URL}/orders`).then(res => res.json()).then(setOrders);
        } else {
            const savedSkus = localStorage.getItem("skus");
            const savedOrders = localStorage.getItem("orders");
            if (savedSkus && skus.length === 0) setSkus(JSON.parse(savedSkus));
            if (savedOrders && orders.length === 0) setOrders(JSON.parse(savedOrders));
        }
    }, [skus.length, orders.length]);


    const addSku = async (newSku) => {
        if (USE_API) {
            const res = await fetch(`${API_URL}/skus`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSku),
            });
            const created = await res.json();
            setSkus(prev => [...prev, created]);
        } else {
            const updated = [...skus, newSku];
            setSkus(updated);
            localStorage.setItem("skus", JSON.stringify(updated));
        }
    };
    const editSku = async (updatedSku) => {
        await fetch(`${API_URL}/skus/${updatedSku.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedSku),
        });
        const refreshed = await fetch(`${API_URL}/skus`).then((r) => r.json());
        setSkus(refreshed);
    };

    const addOrder = async (newOrder) => {
        if (USE_API) {
            const res = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder),
            });
            const created = await res.json();
            setOrders(prev => [...prev, created]);
        } else {
            const updated = [...orders, newOrder];
            setOrders(updated);
            localStorage.setItem("orders", JSON.stringify(updated));
        }
    };

    const editOrder = async ({ id, status }) => {
        try {

            const resGet = await fetch(`${API_URL}/orders/${id}`);
            if (!resGet.ok) throw new Error("Order not found");

            const fullOrder = await resGet.json();

            const updatedOrder = { ...fullOrder, status };
            console.log('updatedOrder', updatedOrder)
            const resPut = await fetch(`${API_URL}/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedOrder),
            });

            if (!resPut.ok) throw new Error("PUT request failed");

            const refreshed = await fetch(`${API_URL}/orders`).then((r) => r.json());
            setOrders(refreshed);
        } catch (err) {
            console.error(`Failed to update order ${id}:`, err);
        }
    };

    return (
        <DataContext.Provider value={{ skus, setSkus, orders, setOrders, addOrder, addSku, editSku, editOrder }}>
            {children}
        </DataContext.Provider>
    );
};
