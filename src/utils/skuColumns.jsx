export const getSkuColumns = ({
  page,
  itemsPerPage,
  skus,
  setForm,
  setEditIndex,
  setShowModal,
  editSku,
  toast,
}) => [
    {
      title: "S. No",
      key: "sno",
      render: (_, __, index) => (page - 1) * itemsPerPage + index + 1,
    },
    {
      title: "SKU Details",
      key: "details",
      render: (_, row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{row.name}</span>
          <span className="text-xs text-gray-500">{row.code}</span>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (val) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-semibold ${val === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {val}
        </span>
      ),
    },
    {
      title: "Price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <div className="space-x-4">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => {
              const realIndex = skus.findIndex((sku) => sku.code === row.code);
              setForm(row);
              setEditIndex(realIndex);
              setShowModal(true);
            }}
          >
            Edit
          </button>
          <button
            className={`text-sm px-2 py-1 rounded ${row.status === "Active"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
              }`}
            onClick={async () => {
              const updated = {
                ...row,
                status: row.status === "Active" ? "Inactive" : "Active",
              };
              await editSku(updated);
              toast(`SKU marked as ${updated.status}`);
            }}
          >
            {row.status === "Active" ? "Disable" : "Enable"}
          </button>
        </div>
      ),
    },
  ];
