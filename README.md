# sku-order-management

Here’s a clean and professional `README.md` file for your project that uses **Vite** for the frontend and **JSON Server** as a mock backend.

---

### ✅ `README.md`

```markdown
# Omniful OMS – SKU & Order Management System

A modern single-page application (SPA) built with **React (Vite)** for managing SKUs and Orders, backed by a mock API using **JSON Server**.

---

## 🚀 Features

- 📦 SKU Management: Create, update, and filter SKUs by status
- 📋 Order Management: View, filter, update status, and create new orders
- 🔍 Search with infinite scroll in dropdowns
- 📊 Pagination, sorting, and bulk actions
- 🌈 Clean, responsive UI built with Tailwind CSS
- ⚙️ Mock RESTful API powered by JSON Server

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **UI:** Tailwind CSS + Lucide Icons
- **Routing:** React Router
- **State Management:** React Context API
- **Mock API:** JSON Server

---

## 📁 Project Structure
```

├── public/
├── src/
│ ├── components/ # Reusable UI components
│ ├── context/ # Global data context
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page-level components (SKUs, Orders, Dashboard)
│ ├── utils/ # Utility functions like column definitions
│ └── App.jsx # Main App component with routing
├── db.json # JSON Server database
├── vite.config.js # Vite config
└── README.md

````

---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/omniful-oms.git
cd omniful-oms
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the JSON Server (mock backend)

```bash
npx json-server --watch db.json --port 4000
```

This will start the API at: [http://localhost:4000](http://localhost:4000)

---

### 4. Start the Vite development server (frontend)

```bash
npm run dev
```

Open your browser at: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Environment Variables

No `.env` is required unless you want to externalize the API URL. Default is:

```js
const API_URL = "http://localhost:4000";
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## ✍️ Author

**Your Name** – [dev-abhishekanand](https://github.com/dev-abhishekanand)

---

## 📝 License

This project is licensed under the MIT License.

```

```
