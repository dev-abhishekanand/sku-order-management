import React from "react";
import Input from "../Input";

const AddressDetailsForm = ({ address, onChange, errors }) => {
    return (
        <div className="m-6">
            <h3 className="text-md font-semibold mb-2">Address Details</h3>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Input
                        name="line"
                        value={address.line}
                        onChange={onChange}
                        placeholder="Address Line"
                    />
                    {errors?.addressLine && <p className="text-red-500 text-xs mt-1">{errors.addressLine}</p>}
                </div>
                <div>
                    <Input
                        name="city"
                        value={address.city}
                        onChange={onChange}
                        placeholder="City"
                    />
                    {errors?.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                    <Input
                        name="country"
                        value={address.country}
                        onChange={onChange}
                        placeholder="Country"
                    />
                    {errors?.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
            </div>
        </div>
    );
};

export default AddressDetailsForm;
