import { Navigate, Route, Routes } from "react-router-dom"
import SKUs from "./pages/SKUPage"
import OrderCreation from "./pages/OrderCreation";
import { DataProvider } from "./context/DataProvider";
import Dashboard from "./pages/DashBoard";
import OrderManagement from "./pages/OrderManagement";
import { validateOrderForm } from "./utils/validateOrderForm";

function App() {

  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/skus" element={<SKUs />} />
        <Route path="/orders/create" element={<OrderCreation validateOrderForm={validateOrderForm} />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </DataProvider>

  )
}

export default App
