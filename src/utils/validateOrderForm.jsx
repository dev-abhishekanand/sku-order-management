export const validateOrderForm = (customer, address, items) => {
    const errors = {};
    if (!customer.fullName.trim()) errors.fullName = "Full Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(customer.email)) errors.email = "Invalid email format.";
    if (!/^\d{10}$/.test(customer.phone)) errors.phone = "Phone must be 10 digits.";
    if (!address.line.trim()) errors.addressLine = "Address Line is required.";
    if (!address.city.trim()) errors.city = "City is required.";
    if (!address.country.trim()) errors.country = "Country is required.";
    if (!items.length) errors.items = "Add at least one order item.";
    return errors;
};