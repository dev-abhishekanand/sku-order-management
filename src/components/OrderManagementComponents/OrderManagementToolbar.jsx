import React from "react";
import SearchInput from "../SearchInput";
import Button from "../Button";

const OrderManagementToolbar = ({
    tabs,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    sortAsc,
    toggleSort,
}) => {
    return (
        <div className="flex justify-between mb-4">
            <div className="flex flex-wrap gap-2">
                {tabs.map((s) => (
                    <Button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-4 py-1 rounded-full text-sm font-medium transition
        ${statusFilter === s
                                ? "bg-gray-900 text-white shadow-md"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
    `}
                    >
                        {s}
                    </Button>
                ))}
            </div>
            <div className="flex gap-2">
                <select
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border px-2 py-1 rounded"
                    value={statusFilter}
                >
                    {tabs.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or ID"
                />
                <Button onClick={toggleSort}>
                    Sort by Date ({sortAsc ? "Asc" : "Desc"})
                </Button>
            </div>
        </div>
    );
};

export default OrderManagementToolbar;