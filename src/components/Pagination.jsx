import React from 'react';

const Pagination = ({ page, total, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(total / itemsPerPage);

    return (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <span>
                Showing {(page - 1) * itemsPerPage + 1}–
                {Math.min(page * itemsPerPage, total)} of {total}
            </span>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span>Page {page}</span>
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default React.memo(Pagination);
