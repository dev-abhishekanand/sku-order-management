import Button from "../components/Button";

export const getOrderColumns = ({
  allSelected,
  handleSelectAll,
  toggleSelection,
  updateStatus,
}) => [
    {
      title: (
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      key: "select",
      render: (_, row) => {
        const isDisabled = row.status !== "New";
        const tooltipText = `Order is ${row.status}, cannot modify`;

        return (
          <div title={isDisabled ? tooltipText : ""}>
            <input
              type="checkbox"
              checked={row.selected || false}
              onChange={() => toggleSelection(row.id)}
              disabled={isDisabled}
              className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
            />
          </div>
        );
      },
    },
    { title: "Order ID", key: "id" },
    {
      title: "Customer Name",
      key: "customer.fullName",
      render: (_, row) => row.contact?.fullName || row.customer || "-",
    },
    {
      title: "Total Amount",
      key: "total",
      render: (value) => `₹${value}`,
    },
    {
      title: "Created At",
      key: "createdAt",
      render: (value) =>
        new Date(value).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
    { title: "Status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => {
        const isDisabled = row.status !== "New";
        const tooltipText = `Action disabled: Order is already ${row.status}`;
        return (
          <div className="space-x-2">
            <div title={isDisabled ? tooltipText : ""} className="inline-block">
              <Button
                onClick={() => updateStatus([row.id], "Delivered")}
                disabled={isDisabled}
                className={`px-2 py-1 ${isDisabled
                  ? "bg-green-200 text-white cursor-not-allowed"
                  : "bg-green-500 text-white"
                  }`}
              >
                Deliver
              </Button>
            </div>
            <div title={isDisabled ? tooltipText : ""} className="inline-block">
              <Button
                onClick={() => updateStatus([row.id], "Cancelled")}
                disabled={isDisabled}
                className={`px-2 py-1 ${isDisabled
                  ? "bg-red-200 text-white cursor-not-allowed"
                  : "bg-red-500 text-white"
                  }`}
              >
                Cancel
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
