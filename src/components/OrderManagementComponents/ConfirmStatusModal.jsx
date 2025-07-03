import React from "react";
import Modal from "../Modal";
import Button from "../Button";

const ConfirmStatusModal = ({ status, onCancel, onConfirm }) => {
    return (
        <Modal onClose={onCancel}>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Confirm status update</h3>
                <p>Are you sure you want to mark the selected orders as {status}?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onCancel} className="bg-gray-300">Cancel</Button>
                    <Button onClick={onConfirm} className="bg-blue-600 text-white">Confirm</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmStatusModal;