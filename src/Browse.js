import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Browse.css';

const Browse = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSort, setActiveSort] = useState('Relevance');


    const products = [
        {
            id: 1,
            title: "Professional DSLR Camera",
            price: "₹1,299.99",
            condition: "Like New",
            category: "Electronics",
            type: "buy",
            rating: 4.8,
            seller: "Sarah Johnson",
            sellerRating: 4.8,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        },
        {
            id: 2,
            title: "Vintage Leather Sofa",
            price: "₹850.00",
            condition: "Good",
            category: "Furniture",
            type: "exchange",
            rating: 4.5,
            seller: "Michael Chen",
            sellerRating: 4.5,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        },
        {
            id: 3,
            title: "Mountain Bike - 21 Speed",
            price: "₹425.00",
            condition: "Good",
            category: "Sports",
            type: "sell",
            rating: 4.6,
            seller: "David Martinez",
            sellerRating: 4.6,
            image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        },
        {
            id: 4,
            title: "Gaming Laptop - RTX",
            price: "₹1,599.99",
            condition: "New",
            category: "Electronics",
            type: "buy",
            rating: 4.9,
            seller: "Emily Rodriguez",
            sellerRating: 4.9,
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        },
        {
            id: 5,
            title: "Antique Oak Dining Table",
            price: "₹1,200.00",
            condition: "Fair",
            category: "Furniture",
            type: "exchange",
            rating: 4.7,
            seller: "Robert Wilson",
            sellerRating: 4.7,
            image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        },
        {
            id: 6,
            title: "Designer Handbag",
            price: "₹350.00",
            condition: "Like New",
            category: "Fashion",
            type: "sell",
            rating: 4.8,
            seller: "Jessica Lee",
            sellerRating: 4.8,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        }
    ];

    const sortOptions = ["Relevance", "Price Low to High", "Price High to Low", "Distance", "Newest First"];

    return (
        <div className="browse-container" style={{
            backgroundColor: "#000"
        }}>
            <Header
                showSignOutButton={true}
                showSingleLoginButton={true}
            />

            {/* Search Bar Section */}
            <div className="browse-search-section">
                <div className="search-bar-wrapper">
                    <input
                        type="text"
                        placeholder="Search for products, categories, or sellers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-btn">Search</button>
                </div>
            </div>

            <div className="browse-content">
                {/* Sidebar Filters */}
                <aside className="filters-sidebar">
                    <p className="results-count">12 results found</p>

                    <div className="filter-section">
                        <div className="filter-group">
                            <h4>Category</h4>
                            <select className="filter-select">
                                <option>All Categories</option>
                                <option>Electronics</option>
                                <option>Furniture</option>
                                <option>Sports</option>
                                <option>Fashion</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <h4>Price Range</h4>
                            <div className="price-inputs">
                                <input type="text" placeholder="Min" defaultValue="0" />
                                <span style={{ color: '#94a3b8' }}>to</span>
                                <input type="text" placeholder="Max" defaultValue="2000" />
                            </div>
                            <input type="range" min="0" max="2000" style={{ width: '100%', marginTop: '15px' }} />
                        </div>

                        <div className="filter-group">
                            <h4>Condition</h4>
                            <div className="condition-list">
                                {["New", "Like New", "Good", "Fair", "Poor"].map(item => (
                                    <label key={item} className="checkbox-label">
                                        <input type="checkbox" defaultChecked={item === "Good"} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group">
                            <h4>Transaction Type</h4>
                            <div className="type-list">
                                {["Buy", "Sell", "Exchange"].map(item => (
                                    <label key={item} className="checkbox-label">
                                        <input type="checkbox" defaultChecked />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group">
                            <h4>Location Radius: 50 miles</h4>
                            <input type="range" min="0" max="100" style={{ width: '100%', marginTop: '5px' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '5px' }}>
                                <span>0 mi</span>
                                <span>100 mi</span>
                            </div>
                        </div>

                        <button className="clear-filters-btn">Clear All Filters</button>
                    </div>
                </aside>

                {/* Main Area */}
                <main className="main-browse-area">
                    <div className="sort-bar">
                        <span className="sort-label">Sort by:</span>
                        {sortOptions.map(option => (
                            <div
                                key={option}
                                className={`sort-option ${activeSort === option ? 'active' : ''}`}
                                onClick={() => setActiveSort(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>

                    <div className="product-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="card-image-wrapper">
                                    <img src={product.image} alt={product.title} className="card-image" />
                                    <div className={`tag-badge tag-${product.type}`}>{product.type}</div>
                                    <button className="wishlist-btn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">{product.title}</h3>
                                    <p className="card-price">{product.price}</p>
                                    <div className="card-info">
                                        <span>Condition: <b style={{ color: '#1e293b' }}>{product.condition}</b></span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ color: '#f59e0b' }}>★</span>
                                            <span>{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="card-meta">
                                        <div className="seller-avatar"></div>
                                        <div className="seller-details">
                                            <p className="seller-name">{product.seller}</p>
                                            <p className="seller-rating">★ {product.sellerRating} Seller</p>
                                        </div>
                                    </div>
                                    <button className="message-btn">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                        Message
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="load-more-container">
                        <button className="load-more-btn">Load More Products</button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Browse;
