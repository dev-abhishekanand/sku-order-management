# Omniful OMS – Order & SKU Management System

A lightweight **Order Management System (OMS)** built using **React (Vite)** and **JSON Server**. It includes features like SKU management, order creation, filtering, pagination, infinite scroll, status updates, and modular UI components.

---

## 🚀 Tech Stack

- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🗂 JSON Server (Mock Backend)
- ♻️ Reusable & Modular Components

---

## 📁 Project Structure

```
├── src
│   ├── components       # Reusable UI components
│   ├── context          # Global state (DataContext)
│   ├── hooks            # Custom hooks
│   ├── pages            # Main views (Order, SKUs)
│   ├── utils            # Utility functions
│   └── App.jsx          # Root component
├── db.json              # JSON Server mock database
├── .env                 # Environment variables
└── README.md
```

---

## 🛠 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/dev-abhishekanand/sku-order-management.git
cd sku-order-management
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Start JSON Server

Make sure `db.json` is present in the root directory.

```bash
npx json-server --watch db.json --port 4000
```

JSON Server will run at ➡️ `http://localhost:4000`

---

### 4️⃣ Start the React App

```bash
npm run dev
```

React app will run at ➡️ `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file in your root directory:

```env
VITE_API_URL=http://localhost:4000
```

Access it in your code using:

```js
const API_URL = import.meta.env.VITE_API_URL;
```

---

## ✅ Features

- ✅ Create & update SKUs with status
- 🔍 SKU filtering and search
- 📋 Order creation with customer, address, item details
- 🔽 Infinite scroll dropdown for SKUs while typing
- 🚦 Order status updates (New → Delivered/Cancelled)
- 📊 Paginated views with sorting and search
- 🧩 Reusable component architecture (Table, Modal, Button, Dropdown, etc.)

---

## 📄 License

MIT © 2025 – Open Source Project
