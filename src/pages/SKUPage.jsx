import React, { useMemo, useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import useData from "../hooks/useData";
import { useNavigate } from "react-router-dom";
import SKUFilterBar from "../components/SkuComponents/SkuFilterBar";
import Pagination from "../components/Pagination";
import SKUForm from "../components/SkuComponents/SkuForm";
import { useToast } from "../hooks/useToast";
import PageHeader from "../components/PageHeader";
import { getSkuColumns } from "../utils/skuColumns";

const initialForm = { name: "", code: "", price: "" };

const SKUs = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const { skus, addSku, editSku } = useData();
    const [statusFilter, setStatusFilter] = useState("Active");
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [editIndex, setEditIndex] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // Apply filters based on status and search text
    const filteredSkus = useMemo(() => {
        return skus.filter(
            (sku) =>
                sku.status === statusFilter &&
                (sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sku.code.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [skus, statusFilter, searchTerm]);

    const paginatedSkus = useMemo(() => {
        return filteredSkus.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }, [filteredSkus, page]);
    const columns = getSkuColumns({
        page,
        itemsPerPage,
        skus,
        setForm,
        setEditIndex,
        setShowModal,
        editSku,
        toast,
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveSku = async () => {
        if (!form?.name || !form?.code || Number(form.price) < 0)
            return toast("All fields are required with non-negative price", "error");
        const updated = { ...form, status: "Active" };

        if (editIndex !== null && form.id) {
            await editSku(updated);
            toast("SKU updated successfully");
        } else {
            await addSku(updated);
            toast("SKU created successfully");
        }

        setForm(initialForm);
        setEditIndex(null);
        setShowModal(false);
    };

    return (
        <div className="p-6">
            <PageHeader title="SKU Management">
                <Button
                    className="bg-blue-600"
                    onClick={() => {
                        setForm(initialForm);
                        setEditIndex(null);
                        setShowModal(true);
                    }}
                >
                    + Create SKU
                </Button>
            </PageHeader>


            <SKUFilterBar
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onNavigate={() => navigate("/orders/create")}
            />

            <Table columns={columns} data={paginatedSkus} />

            <Pagination
                page={page}
                total={filteredSkus.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setPage}
            />

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SKUForm
                        form={form}
                        onChange={handleFormChange}
                        onCancel={() => setShowModal(false)}
                        onSubmit={handleSaveSku}
                        isEdit={editIndex !== null}
                    />
                </Modal>
            )}
        </div>
    );
};

export default SKUs;
