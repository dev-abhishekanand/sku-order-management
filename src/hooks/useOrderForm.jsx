// hooks/useOrderForm.js
import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import useData from "./useData";
import { API_URL } from "../constants";

const initialCustomer = { fullName: "", email: "", phone: "" };
const initialAddress = { line: "", city: "", country: "" };
const ITEMS_PER_PAGE = 10;

export const useOrderForm = (validateOrderForm) => {
    const toast = useToast();
    const { addOrder } = useData();

    const [skus, setSkus] = useState([]);
    const [customer, setCustomer] = useState(initialCustomer);
    const [address, setAddress] = useState(initialAddress);
    const [orderItems, setOrderItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSkus, setFilteredSkus] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [searchPage, setSearchPage] = useState(1); // ✅ NEW

    useEffect(() => {
        fetch(`${API_URL}/skus`)
            .then((res) => res.json())
            .then((data) => setSkus(data.filter((s) => s.status === "Active")));
    }, []);

    useEffect(() => {
        const results = skus.filter((sku) =>
            sku.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSkus(results.slice(0, searchPage * ITEMS_PER_PAGE));
    }, [searchTerm, searchPage, skus]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setSearchPage(1); // Reset page on new search
    };

    const loadMoreSearchResults = () => {
        setSearchPage((prev) => prev + 1); // This triggers `useEffect` to fetch more
    };
    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone" && !/^\d{0,10}$/.test(value)) return;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    // const handleSearch = (e) => {
    //     const term = e.target.value;
    //     setSearchTerm(term);
    //     const filtered = skus
    //         .filter((sku) =>
    //             sku.name.toLowerCase().includes(term.toLowerCase())
    //         )
    //         .slice(0, 10);
    //     setSearchPage(1);

    //     setFilteredSkus(filtered);
    // };

    const addItem = (sku) => {
        if (orderItems.find((item) => item.code === sku.code)) return;
        setOrderItems((prev) => [
            ...prev,
            { ...sku, quantity: 1, subtotal: parseFloat(sku.price) },
        ]);
        setSearchTerm("");
    };

    const updateQuantity = (index, quantity) => {
        if (quantity < 1) return;
        const updated = [...orderItems];
        updated[index].quantity = quantity;
        updated[index].subtotal = quantity * parseFloat(updated[index].price);
        setOrderItems(updated);
    };

    const totalAmount = orderItems.reduce((acc, item) => acc + item.subtotal, 0);

    const handleSubmit = async () => {
        const errors = validateOrderForm(customer, address, orderItems);
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const order = {
            id: Date.now().toString(),
            customer: customer.fullName,
            contact: customer,
            address,
            items: orderItems,
            status: "New",
            createdAt: new Date().toISOString(),
            total: totalAmount.toFixed(2),
            selected: false,
        };

        await addOrder(order);
        toast("Order successfully created!");
    };

    return {
        customer,
        address,
        orderItems,
        searchTerm,
        filteredSkus,
        formErrors,
        totalAmount,
        handleCustomerChange,
        handleAddressChange,
        handleSearch,
        addItem,
        updateQuantity,
        handleSubmit,
        onLoadMore: loadMoreSearchResults, // ✅ expose this

    };
};
