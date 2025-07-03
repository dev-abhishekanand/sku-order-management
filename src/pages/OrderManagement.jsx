import React, { useState, useMemo, useContext, useCallback } from "react";
import OrderManagementToolbar from "../components/OrderManagementComponents/OrderManagementToolbar";
import ConfirmStatusModal from "../components/OrderManagementComponents/ConfirmStatusModal";
import Pagination from "../components/Pagination";
import { useToast } from "../hooks/useToast";
import DataContext from "../context/DataContext";
import Button from "../components/Button";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { getOrderColumns } from "../utils/orderColumns";

const TABS = ["All", "New", "Delivered", "Cancelled"];
const ITEMS_PER_PAGE = 10;

const OrderManagement = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { orders, editOrder } = useContext(DataContext);
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortAsc, setSortAsc] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState(null);

    //Filter, search, and sort orders 
    const filteredOrders = useMemo(() => {
        let filtered = [...orders];

        if (statusFilter !== "All") {
            filtered = filtered.filter((o) => o.status === statusFilter);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (o) =>
                    o.customer.toLowerCase().includes(term) ||
                    o.id.toString().includes(term)
            );
        }

        filtered.sort((a, b) =>
            sortAsc
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt)
        );

        return filtered;
    }, [orders, statusFilter, searchTerm, sortAsc]);

    const paginatedOrders = useMemo(() => {
        return filteredOrders
            .map((order) => ({
                ...order,
                selected: selectedIds.includes(order.id),
            }))
            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    }, [filteredOrders, currentPage, selectedIds]);

    const toggleSelection = useCallback((id) => {
        setSelectedIds((prev) => {
            const newSelectedIds = prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id];

            setAllSelected(newSelectedIds.length === paginatedOrders.length);
            return newSelectedIds;
        });
    }, [paginatedOrders]);


    const handleSelectAll = useCallback((selectAll) => {
        setAllSelected(selectAll);
        const idsOnPage = paginatedOrders.map((o) => o.id);
        if (selectAll) {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...idsOnPage])));
        } else {
            setSelectedIds((prev) => prev.filter((id) => !idsOnPage.includes(id)));
        }
    }, [paginatedOrders])

    const updateStatus = useCallback((ids, status) => {
        const validIds = ids.filter((id) => {
            const order = orders.find((o) => o.id === id);
            return order?.status === "New";
        });

        if (validIds.length === 0) {
            toast.warning("No valid 'New' orders selected for status update");
            return;
        }

        setConfirmStatus({ ids: validIds, status });
    }, [orders, toast]);

    const confirmStatusUpdate = async () => {
        const { ids, status } = confirmStatus;

        await Promise.all(ids.map((id) => editOrder({ id, status })));

        // toast.success(`Marked ${ids.length} order(s) as ${status}`);
        setConfirmStatus(null);
        setSelectedIds([]);
        setAllSelected(false);
    };

    const columns = useMemo(
        () =>
            getOrderColumns({
                allSelected,
                handleSelectAll,
                toggleSelection,
                updateStatus,
            }),
        [allSelected, handleSelectAll, toggleSelection, updateStatus]
    );

    return (
        <div className="p-4 space-y-4">

            <PageHeader title="Order Management" />

            <div className="mb-4 flex gap-2">
                <Button onClick={() => navigate("/orders/create")}>
                    ← Order Creation
                </Button>
            </div>

            <OrderManagementToolbar
                tabs={TABS}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortAsc={sortAsc}
                toggleSort={() => setSortAsc((prev) => !prev)}
            />

            <div className="flex justify-end items-center mb-4">
                <div className="flex gap-2">
                    <Button
                        onClick={() => updateStatus(selectedIds, "Delivered")}
                        className="bg-green-600"
                    >
                        Mark as Delivered
                    </Button>
                    <Button
                        onClick={() => updateStatus(selectedIds, "Cancelled")}
                        className="bg-red-600"
                    >
                        Mark as Cancelled
                    </Button>
                </div>
            </div>

            <Table columns={columns} data={paginatedOrders} />

            <Pagination
                page={currentPage}
                total={filteredOrders.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
            />

            {confirmStatus && (
                <ConfirmStatusModal
                    status={confirmStatus.status}
                    onCancel={() => setConfirmStatus(null)}
                    onConfirm={confirmStatusUpdate}
                />
            )}
        </div>
    );
};

export default OrderManagement;
