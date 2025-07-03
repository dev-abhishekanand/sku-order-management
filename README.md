# Order Management System (OMS)

A comprehensive Order Management System built with React, featuring SKU management and order processing capabilities with a modern, responsive interface.

🔗 **Live Demo**: [https://omniful-sku-order-management.netlify.app/](https://omniful-sku-order-management.netlify.app/)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Trade-offs & Assumptions](#trade-offs--assumptions)
- [Performance Optimizations](#performance-optimizations)

## ✨ Features

### 🏷️ SKU Management

- **Add & Update SKUs**: Create and modify product information
- **Comprehensive SKU Fields**: Name, Code, and Price with validation
- **Paginated SKU List**: Organized display with pagination controls
- **Advanced Search**: Searchable dropdown with infinite scroll
- **Batch Loading**: Load results in batches of 10 for optimal performance
- **Active/Inactive Status**: Control SKU availability for orders (Bonus feature)

### 📦 Order Creation

- **Customer Information**: Full name, validated email, and 10-digit phone
- **Address Management**: Complete address collection (Line, City, Country)
- **Dynamic Order Items**:
  - SKU selection via searchable dropdown
  - Readonly SKU details (Name, Code, Price)
  - Quantity controls with whole number validation
  - Real-time subtotal calculation
- **Live Total Calculation**: Dynamic order amount updates
- **Form Validation**: Comprehensive validation with inline error messages
- **Order Status**: Automatic "New" status assignment

### 📊 Order Management

- **Tab-based Filtering**: New, Delivered, Cancelled, and All orders
- **Advanced Search**: Filter by customer name and order ID
- **Sorting Options**: Sort by creation date (ASC/DESC)
- **Status Management**: Single and bulk status updates
- **Confirmation Modals**: Safe status update confirmations
- **Pagination**: 10 orders per page for optimal performance
- **Toast Notifications**: User feedback for all actions

## 🛠️ Tech Stack

### Core Technologies

- **React 18** - Modern functional components with hooks
- **JavaScript (ES6+)** - Latest JavaScript features
- **CSS3** - Modern styling with Flexbox/Grid
- **HTML5** - Semantic markup

### State Management

- **Local Storage** - Persistent data storage
- **Context API** - Global state management
- **Custom Hooks** - Reusable logic abstraction

### Custom Hooks Implemented

- `useOrderForm` - Order form state management
- `useToast` - Toast notification system

### Reusable Components

- **Button** - Customizable button component
- **Input** - Form input with validation
- **Dropdown** - Searchable dropdown with pagination
- **Modal** - Confirmation and dialog modals
- **Table** - Data display with sorting/filtering
- **QtyButton** - Quantity selector with validation
- **Toast** - Notification system

### Performance Optimizations

- **React.memo** - Component memoization
- **useMemo** - Expensive calculation memoization
- **useCallback** - Function memoization
- **Lazy Loading** - Component code splitting
- **Debounced Search** - Optimized search performance

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/dev-abhishekanand/sku-order-management.git
   cd sku-order-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev

   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - The application will automatically reload if you make changes to the code

### Build for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify (if you have Netlify CLI installed)
netlify deploy --prod --dir=build
```

## 📁 Project Structure

```
sku-order-management/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── QtyButton.jsx
│   │   │   └── Toast.jsx
│   │   ├── sku/
│   │   │   ├── SKUList.jsx
│   │   │   ├── SKUForm.jsx
│   │   │   └── SKUSearch.jsx
│   │   └── orders/
│   │       ├── OrderForm.jsx
│   │       ├── OrderList.jsx
│   │       └── OrderFilters.jsx
│   ├── hooks/
│   │   ├── useFetch.js
│   │   ├── useOrderForm.js
│   │   ├── useToast.js
│   │   ├── useLocalStorage.js
│   │   ├── usePagination.js
│   │   └── useSearch.js
│   ├── context/
│   │   ├── AppContext.js
│   │   └── ToastContext.js
│   ├── utils/
│   │   ├── validation.js
│   │   ├── storage.js
│   │   └── constants.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── components.css
│   ├── App.jsx
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

## 📖 Usage Guide

### SKU Management

1. **Adding SKUs**: Navigate to SKU Management and fill in the required fields
2. **Updating SKUs**: Click edit on any SKU in the list
3. **Searching SKUs**: Use the search functionality with pagination support
4. **Status Management**: Toggle between Active/Inactive status (Bonus feature)

### Order Creation

1. **Customer Details**: Fill in name, email (validated), and phone (10-digit)
2. **Address Information**: Complete address details
3. **Adding Items**: Use the searchable dropdown to select SKUs
4. **Quantity Management**: Use the QtyButton for whole number quantities
5. **Review & Submit**: Check the dynamic total and submit the order

### Order Management

1. **Filtering**: Use tabs to filter by order status
2. **Searching**: Search by customer name or order ID
3. **Sorting**: Click column headers to sort by date
4. **Status Updates**: Use individual or bulk actions to update order status
5. **Confirmation**: All status changes require confirmation

## 🔄 Trade-offs & Assumptions

### Data Storage Decision

- **Choice**: Local Storage instead of external APIs
- **Reasoning**:
  - Simplified setup without backend dependencies
  - Immediate data persistence
  - No network latency concerns
  - Suitable for assessment scope
- **Trade-off**: Data is browser-specific and not shared across devices

### State Management Approach

- **Choice**: Context API + Local Storage
- **Reasoning**:
  - Appropriate for medium complexity
  - Avoids Redux overhead for this scope
  - Maintains clean component architecture
- **Trade-off**: Less powerful dev tools compared to Redux

### Form Validation Strategy

- **Choice**: Custom validation over React Hook Form
- **Reasoning**:
  - Full control over validation logic
  - Better integration with toast notifications
  - Demonstrates custom hook creation skills
- **Trade-off**: More boilerplate code compared to established libraries

### UI Framework Decision

- **Choice**: Custom CSS over UI libraries
- **Reasoning**:
  - Demonstrates CSS skills
  - Complete control over styling
  - No external dependencies
- **Trade-off**: More development time compared to using pre-built components

### Performance Assumptions

- **Data Volume**: Assumed moderate data volumes (hundreds of SKUs/orders)
- **Browser Support**: Modern browsers with localStorage support
- **Network**: Optimized for local storage, no network optimization needed

## ⚡ Performance Optimizations

### React Optimizations

- **React.memo**: Prevents unnecessary re-renders of components
- **useMemo**: Memoizes expensive calculations (filtering, sorting)
- **useCallback**: Memoizes event handlers to prevent child re-renders
- **Lazy Loading**: Code splitting for better initial load times

### Search & Pagination

- **Debounced Search**: 300ms delay to reduce excessive API calls
- **Infinite Scroll**: Loads data in batches of 10
- **Virtual Scrolling**: Efficient rendering of large lists
- **Pagination**: Limits data processing to current page

### Data Management

- **Efficient Updates**: Minimal localStorage writes
- **Cached Calculations**: Memoized totals and subtotals
- **Optimistic Updates**: UI updates immediately, then syncs with storage

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Development Notes

### Environment Variables

No environment variables required for this project as it uses local storage.

## 📝 License

This project is created for assessment purposes.

## 👨‍💻 Author

**Abhishek Anand**

- GitHub: [@dev-abhishekanand](https://github.com/dev-abhishekanand)
- Live Demo: [https://omniful-sku-order-management.netlify.app/](https://omniful-sku-order-management.netlify.app/)

---
