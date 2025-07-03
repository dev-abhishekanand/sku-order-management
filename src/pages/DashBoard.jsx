import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Package, Truck, Ban } from "lucide-react";
import DataContext from "../context/DataContext";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
    const navigate = useNavigate();
    const { skus, orders } = useContext(DataContext);

    const totalSkus = skus.length;
    const activeSkus = skus.filter((s) => s.status === "Active").length;
    const inactiveSkus = skus.filter((s) => s.status === "Inactive").length;

    const totalOrders = orders.length;
    const newOrders = orders.filter((o) => o.status === "New").length;
    const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
    const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;

    const metricRow = "flex items-center justify-between gap-3 py-1";

    const metricBlock = (Icon, label, value) => (
        <div className={metricRow}>
            <div className="flex items-center gap-2 text-gray-600">
                <Icon size={18} />
                <span>{label}</span>
            </div>
            <span className="font-bold text-gray-800">{value}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center px-6 py-10">

            <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center tracking-wide drop-shadow">
                Omniful OMS Dashboard
            </h1>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">

                <DashboardCard
                    title="📦 SKU Management"
                    description="Manage your product SKUs, update details and track availability."
                    metrics={
                        <>
                            {metricBlock(Package, "Total SKUs", totalSkus)}
                            {metricBlock(BarChart3, "Active SKUs", activeSkus)}
                            {metricBlock(Ban, "Inactive SKUs", inactiveSkus)}
                        </>
                    }
                    buttonText="Go to SKUs"
                    onClick={() => navigate("/skus")}
                />

                <DashboardCard
                    title="📋 Order Management"
                    description="View customer orders, update statuses and manage fulfillment."
                    metrics={
                        <>
                            {metricBlock(BarChart3, "Total Orders", totalOrders)}
                            {metricBlock(Package, "New Orders", newOrders)}
                            {metricBlock(Truck, "Delivered Orders", deliveredOrders)}
                            {metricBlock(Ban, "Cancelled Orders", cancelledOrders)}
                        </>
                    }
                    buttonText="Go to Orders"
                    onClick={() => navigate("/orders")}
                />

            </div>
        </div>
    );
};

export default Dashboard;
