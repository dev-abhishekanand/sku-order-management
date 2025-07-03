import Button from "../components/Button";
import { useOrderForm } from "../hooks/useOrderForm";
import CustomerDetailsForm from "../components/OrderCreationComponents/CustomerDetailsForm";
import AddressDetailsForm from "../components/OrderCreationComponents/AddressDetailsForm";
import OrderItemsForm from "../components/OrderCreationComponents/OrderItems";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const OrderCreation = ({ validateOrderForm }) => {
    const navigate = useNavigate()
    const {
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
        onLoadMore,
    } = useOrderForm(validateOrderForm);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <PageHeader title="Order Creation" />
            <Button onClick={() => navigate("/dashboard")}>← Dashboard</Button>

            <CustomerDetailsForm
                customer={customer}
                onChange={handleCustomerChange}
                errors={formErrors}
            />

            <AddressDetailsForm
                address={address}
                onChange={handleAddressChange}
                errors={formErrors}
            />

            <OrderItemsForm
                searchTerm={searchTerm}
                filteredSkus={filteredSkus}
                onSearch={handleSearch}
                onAddItem={addItem}
                orderItems={orderItems}
                onUpdateQty={updateQuantity}
                formError={formErrors.items}
                totalAmount={totalAmount}
                onLoadMore={onLoadMore} // ✅ this now works properly

            />
            <hr className="my-6 border-gray-300" />

            <div className="flex gap-2 mb-6 justify-between">
                <Button onClick={() => navigate("/orders")}>Orders →</Button>
                <Button onClick={handleSubmit}>Create Order</Button>
            </div>

        </div>
    );
};

export default OrderCreation;
