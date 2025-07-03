import React from 'react'

const Table = ({ columns, data }) => {
    return (
        <div className="overflow-x-auto rounded-2xl shadow border border-gray-200">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-700">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-4 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider border-b"
                            >
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 mt-2">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center p-4 text-gray-500">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
                                        {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};



export default Table

