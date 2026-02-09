import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoginFormPopup from "./LoginFormPopup";
import { API_BASE_URL } from "./constants";
import { useEffect } from "react";

function Cart() {
  const [showLoginFormPopup, setShowLoginFormPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) return;
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/cart`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch cart');
        setCart(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [isAuthenticated]);
  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100dvh",
        overflowY: "auto",
        backgroundColor: "#000",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }}
    >
            <Header />
            <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100vh - 60px)",
              paddingTop: "60px"
            }}
      >
        <main
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
            color: "#333",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              padding: "40px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              maxWidth: "800px",
              width: "100%"
            }}
          >
            <h1 style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#184872",
              marginBottom: "20px",
              fontFamily: "momo trust display"
            }}>
              🛒 Your Cart
            </h1>
            {!isAuthenticated && (
              <div style={{ marginTop: "30px" }}>
                <p style={{
                  fontSize: "1rem",
                  color: "#666",
                  marginBottom: "20px",
                  fontFamily: "momo trust display"
                }}>
                  Please log in to access your cart and start shopping!
                </p>
                <button
                  style={{
                    background: "#667eea",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                    fontFamily: "momo trust display",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#667eea";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
                  }}
                  onClick={() => setShowLoginFormPopup(true)}
                >
                  Login
                </button>
              </div>
            )}

            {isAuthenticated && (
              <div>
                {loading ? (
                  <p>Loading cart...</p>
                ) : (
                  <div>
                    {(!cart || !cart.items || cart.items.length === 0) ? (
                      <p style={{ fontSize: '1.2rem', color: '#666' }}>Your shopping cart is currently empty.</p>
                    ) : (
                      <div>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                          {cart.items.map((it) => (
                            <li key={it._id || it.product._id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                              <img src={it.product.image} alt={it.product.title} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600' }}>{it.product.title || it.product.name}</div>
                                <div style={{ color: '#666' }}>Qty: {it.quantity}</div>
                              </div>
                              <div style={{ fontWeight: '700' }}>₹{(it.price * it.quantity).toFixed(2)}</div>
                            </li>
                          ))}
                        </ul>
                        <div style={{ marginTop: 20, textAlign: 'right' }}>
                          <button onClick={async () => {
                            try {
                              const token = localStorage.getItem('token');
                              const orderPayload = {
                                items: cart.items.map(i => ({ product: i.product._id || i.product, quantity: i.quantity, price: i.price })),
                                totalAmount: cart.items.reduce((s, i) => s + (i.price * i.quantity), 0),
                                shippingAddress: 'Not provided',
                                shippingCity: 'Not provided',
                                shippingZipCode: '000000',
                                paymentMethod: 'cash_on_delivery'
                              };
                              const res = await fetch(`${API_BASE_URL}/orders`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                                body: JSON.stringify(orderPayload)
                              });
                              const data = await res.json();
                              if (!res.ok) throw new Error(data.message || 'Checkout failed');
                              alert('Order created successfully!');
                              setCart({ items: [] });
                            } catch (err) {
                              alert(err.message);
                            }
                          }} style={{ background: '#667eea', color: 'white', padding: '12px 20px', borderRadius: 8, border: 'none' }}>Checkout</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
      {showLoginFormPopup && (
        <LoginFormPopup
          onClose={() => setShowLoginFormPopup(false)}
          onLoginSuccess={() => {
            localStorage.setItem("isAuthenticated", "true");
            setIsAuthenticated(true);
            setShowLoginFormPopup(false);
            // Stay on cart page instead of redirecting to home
          }}
        />
      )}
    </div>
  );
}

export default Cart;
