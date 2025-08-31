# Customer Management App

A full-stack customer management application built with **React (frontend)** and **Node.js + Express (backend)**.  
It allows you to manage customers with multiple addresses, including:

- Add, edit, delete customers
- Search customers by name or phone
- Manage multiple addresses per customer
- Pagination for customer listing
- Mobile responsive UI with media queries

---

## 🚀 Tech Stack

- **Frontend**: React, React Router DOM, Axios
- **Backend**: Node.js, Express
- **Database**: SQLite (default) — can be swapped with MySQL/PostgreSQL
- **Styling**: CSS (responsive with media queries)

---

## 📂 Project Structure

```bash
customer-management-app/
│
├── backend/ # Express backend
│ ├── index.js # API server
│ ├── db.js # Database connection & schema
│ ├── package.json # Backend dependencies
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── App.js
│ │ ├── api.js
│ │ ├── pages/
│ │ │ ├── CustomerListPage.js
│ │ │ ├── CustomerDetailPage.js
│ │ │ ├── CustomerFormPage.js
│ │ ├── styles/ (all .css files)
│ ├── package.json # Frontend dependencies
│
└── README.md # Project documentation
```

---

## ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/customer-management-app.git
cd customer-management-app
```

### 2. Setup backend

```bash
cd server
node index.js
```

### 3.Setup frontend

```bash
cd client
npm install
npm start
```
### API Endpoints (Backend)
| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/customers`               | Get paginated customers   |
| GET    | `/customers/:id`           | Get a customer by ID      |
| POST   | `/customers`               | Create a new customer     |
| PUT    | `/customers/:id`           | Update a customer         |
| DELETE | `/customers/:id`           | Delete a customer         |
| POST   | `/customers/:id/addresses` | Add address to a customer |
| PUT    | `/addresses/:id`           | Update an address         |
| DELETE | `/addresses/:id`           | Delete an address         |


### Features
Customer List: Pagination, search by name/phone
Customer Detail: View details + manage addresses
Customer Form: Add/Edit customer
Responsive Design: Works well on mobile/tablet/desktop
Reusable CSS: Shared button, table, card styles

### Development Notes
Update backend db.js if switching from SQLite to MySQL/Postgres
API URL for frontend is configured in frontend/src/api.js
For production, serve frontend build from backend
