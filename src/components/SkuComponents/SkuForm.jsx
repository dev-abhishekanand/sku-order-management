import React from 'react';
import Input from '../Input';
import Button from '../Button';

const SKUForm = ({ form, onChange, onCancel, onSubmit, isEdit }) => {
    return (
        <div className="p-4 w-full">
            <h3 className="text-lg font-semibold mb-4">
                {isEdit ? "Update SKU" : "Create SKU"}
            </h3>
            <Input name="name" value={form.name} onChange={onChange} placeholder="SKU Name" className="mb-2" />
            <Input name="code" value={form.code} onChange={onChange} placeholder="SKU Code" className="mb-2" />
            <Input name="price" value={form.price} onChange={onChange} placeholder="Price" type="number" className="mb-4" />
            <div className="flex justify-center gap-2">
                <Button onClick={onCancel} className="bg-gray-300 text-black">Cancel</Button>
                <Button onClick={onSubmit}>{isEdit ? "Update" : "Create"}</Button>
            </div>
        </div>
    );
};

export default SKUForm;
