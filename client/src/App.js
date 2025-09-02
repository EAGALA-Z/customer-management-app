import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CustomerListPage from './pages/CustomerListPage';
import CustomerFormPage from './pages/CustomerFormPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/"><h1>Customer Management</h1></Link>
        <nav>
          <Link to="/">Customers</Link>
          <Link to="/customers/new">New Customer</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<CustomerListPage/>} />
          <Route path="/customers/new" element={<CustomerFormPage/>} />
          <Route path="/customers/:id/edit" element={<CustomerFormPage editMode />} />
          <Route path="/customers/:id" element={<CustomerDetailPage/>} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
