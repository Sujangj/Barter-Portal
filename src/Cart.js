import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoginFormPopup from "./LoginFormPopup";

const CART_BG =
  "https://images.unsplash.com/photo-1610209455607-89e8b3e0e393?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVycGxlJTIwZ2FsYXh5fGVufDB8fDB8fHww";

function Cart() {
  const [showLoginFormPopup, setShowLoginFormPopup] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100dvh",
        overflowY: "auto",
        backgroundImage: `url('${CART_BG}')`,
        backgroundColor: "#fff",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
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
              maxWidth: "500px",
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
            <p style={{
              fontSize: "1.2rem",
              color: "#666",
              marginBottom: "30px",
              fontFamily: "momo trust display"
            }}>
              Your shopping cart is currently empty.
            </p>
            <p style={{
              fontSize: "1rem",
              color: "#888",
              fontFamily: "momo trust display"
            }}>
              Add items to your cart to see them here!
            </p>
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
          </div>
        </main>

        <Footer />
      </div>
      {showLoginFormPopup && (
        <LoginFormPopup
          onClose={() => setShowLoginFormPopup(false)}
          onLoginSuccess={() => {
            localStorage.setItem("isAuthenticated", "true");
            setShowLoginFormPopup(false);
            // Optionally refresh the page or update state
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}

export default Cart;
