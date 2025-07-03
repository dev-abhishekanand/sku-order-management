import React from 'react';
import SearchInput from '../SearchInput';
import Button from '../Button';

const SKUFilterBar = ({ statusFilter, setStatusFilter, searchTerm, setSearchTerm, onNavigate }) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 text-sm px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-100"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search in SKUs"
                    className="w-60"
                />
            </div>
            <Button onClick={onNavigate} className='flex items-center gap-1'>Move to Order Creation<span className="text-lg">→</span></Button>
        </div>
    );
};

export default SKUFilterBar;
