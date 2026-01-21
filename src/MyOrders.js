import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./MyOrders.css";

const CATEGORY_IMAGES = {
    "Vintage Leather": "https://images.unsplash.com/photo-1524383537042-57f6f962630d?auto=format&fit=crop&q=80&w=200",
    "Wireless Bluetooth": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200",
    "Handmade Ceramic": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=200",
    "Smart Fitness": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=200",
    "Organic Cotton T": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200",
    "Professional Camera": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200"
};

const ORDER_DATA = [
    { id: "AORD-2026-001", product: "Vintage Leather", type: "Buy", status: "delivered", date: "01/02/2026", amount: "₹140.39" },
    { id: "AORD-2026-002", product: "Wireless Bluetooth", type: "Exchange", status: "pending", date: "01/03/2026", amount: "₹89.99" },
    { id: "AORD-2026-003", product: "Handmade Ceramic", type: "Sell", status: "confirmed", date: "01/04/2026", amount: "₹45.00" },
    { id: "AORD-2026-004", product: "Smart Fitness", type: "Buy", status: "shipped", date: "01/14/2026", amount: "₹199.99" },
    { id: "AORD-2026-005", product: "Organic Cotton T", type: "Buy", status: "cancelled", date: "12/28/2025", amount: "₹25.00" },
    { id: "AORD-2026-006", product: "Professional Camera", type: "Exchange", status: "confirmed", date: "01/01/2026", amount: "₹299.99" }
];

function MyOrders() {
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    return (
        <div className="myorders-container" style={{
            backgroundColor: "#000"
        }}>
            <Header showSignOutButton={true} />

            <div className="myorders-content">
                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="summary-card">
                        <div className="card-header">
                            <span className="card-label">Total Orders</span>
                            <div className="card-icon-wrapper" style={{ background: '#eff6ff' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                            </div>
                        </div>
                        <span className="card-value">6</span>
                    </div>

                    <div className="summary-card">
                        <div className="card-header">
                            <span className="card-label">Pending</span>
                            <div className="card-icon-wrapper" style={{ background: '#fffbeb' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                        </div>
                        <span className="card-value">1</span>
                    </div>

                    <div className="summary-card">
                        <div className="card-header">
                            <span className="card-label">Delivered</span>
                            <div className="card-icon-wrapper" style={{ background: '#ecfdf5' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            </div>
                        </div>
                        <span className="card-value">1</span>
                    </div>

                    <div className="summary-card">
                        <div className="card-header">
                            <span className="card-label">Total Spent</span>
                            <div className="card-icon-wrapper" style={{ background: '#fff7ed' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            </div>
                        </div>
                        <span className="card-value">₹859.96</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-container">
                    <div
                        className={`filters-header ${isFilterExpanded ? 'expanded' : ''}`}
                        onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                    >
                        <div className="filters-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                            Filters
                            <span style={{ fontSize: '12px', color: '#3b82f6', marginLeft: '5px' }}>4 results</span>
                        </div>
                        <svg
                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            style={{ transform: isFilterExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>

                    {isFilterExpanded && (
                        <div className="filters-body">
                            <div className="filter-group">
                                <label>Date From</label>
                                <input type="date" className="filter-input" placeholder="dd-mm-yyyy" />
                            </div>
                            <div className="filter-group">
                                <label>Date To</label>
                                <input type="date" className="filter-input" placeholder="dd-mm-yyyy" />
                            </div>
                            <div className="filter-group">
                                <label>Status</label>
                                <select className="filter-select">
                                    <option>All Statuses</option>
                                    <option>Delivered</option>
                                    <option>Pending</option>
                                    <option>Shipped</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Transaction Type</label>
                                <select className="filter-select">
                                    <option>All Types</option>
                                    <option>Buy</option>
                                    <option>Sell</option>
                                    <option>Exchange</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Min Amount (₹)</label>
                                <input type="number" className="filter-input" placeholder="0" />
                            </div>
                            <div className="filter-group">
                                <label>Max Amount (₹)</label>
                                <input type="number" className="filter-input" placeholder="1000.00" />
                            </div>
                            <div className="filter-actions">
                                <button className="reset-btn">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Orders Table */}
                <div className="orders-table-wrapper">
                    <div className="table-header-section">
                        <h2 className="table-title">My Orders</h2>
                        <button className="export-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                            Export All
                        </button>
                    </div>

                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ORDER_DATA.map((order, index) => (
                                <tr key={index}>
                                    <td className="order-id">{order.id}</td>
                                    <td>
                                        <div className="product-cell">
                                            <img src={CATEGORY_IMAGES[order.product]} alt="" className="product-thumb" />
                                            <span className="product-name">{order.product}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`type-badge type-${order.type.toLowerCase()}`}>
                                            {order.type}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${order.status}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.date}</td>
                                    <td className="amount-cell">{order.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default MyOrders;
