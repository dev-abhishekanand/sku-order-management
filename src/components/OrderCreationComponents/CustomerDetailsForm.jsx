import React from "react";
import Input from "../Input";

const CustomerDetailsForm = ({ customer, onChange, errors }) => {
    return (
        <div className="m-6">
            <h3 className="text-md font-semibold mb-2">Customer Details</h3>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Input
                        name="fullName"
                        value={customer.fullName}
                        onChange={onChange}
                        placeholder="Full Name"
                    />
                    {errors?.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                    <Input
                        name="email"
                        value={customer.email}
                        onChange={onChange}
                        placeholder="Email"
                    />
                    {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                    <Input
                        type="tel"
                        name="phone"
                        value={customer.phone}
                        onChange={onChange}
                        placeholder="Phone (10 digits)"
                    />
                    {errors?.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailsForm;
