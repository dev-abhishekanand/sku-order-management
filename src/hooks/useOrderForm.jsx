import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import useData from "./useData";

const initialCustomer = { fullName: "", email: "", phone: "" };
const initialAddress = { line: "", city: "", country: "" };
const ITEMS_PER_PAGE = 10;

export const useOrderForm = (validateOrderForm) => {
    const toast = useToast();
    const { addOrder, skus: allSkus } = useData();

    const [skus, setSkus] = useState([]);
    const [customer, setCustomer] = useState(initialCustomer);
    const [address, setAddress] = useState(initialAddress);
    const [orderItems, setOrderItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSkus, setFilteredSkus] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [searchPage, setSearchPage] = useState(1);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    useEffect(() => {
        const activeSkus = allSkus.filter((s) => s.status === "Active");
        setSkus(activeSkus);
    }, [allSkus]);


    useEffect(() => {
        const results = skus.filter((sku) =>
            sku.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSkus(results.slice(0, searchPage * ITEMS_PER_PAGE));
    }, [searchTerm, searchPage, skus]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setSearchPage(1);
    };

    const loadMoreSearchResults = () => {
        setSearchPage((prev) => prev + 1);
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

        setShowSuccessModal(true);

        setCustomer({ fullName: "", email: "", phone: "" });
        setAddress({ line: "", city: "", country: "" });
        setOrderItems([]);
        setFormErrors({});
    };

    const resetForm = () => {
        setShowSuccessModal(false);
        setCustomer(initialCustomer);
        setAddress(initialAddress);
        setOrderItems([]);
        setFormErrors({});
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
        onLoadMore: loadMoreSearchResults,
        resetForm,
        showSuccessModal
    };
};
