import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpFormPopup from "./SignUpFormPopup";
import LoginFormPopup from "./LoginFormPopup";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css";

// Social media icons as inline SVGs (fontawesome style, but inline for no dependency)
function SocialIcon({ type, url }) {
    let icon;
    if (type === "twitter") {
        icon = (
            <svg height="24" width="24" fill="#fff" viewBox="0 0 24 24" aria-label="X (Twitter)">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        );
    } else if (type === "facebook") {
        icon = (
            <svg height="24" width="24" fill="#fff" viewBox="0 0 24 24" aria-label="Facebook">
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.48v-9.294H9.692V11.01h3.114V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24 l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.314h3.587l-.467 3.696h-3.12V24h6.116c.726 0 1.326-.6 1.326-1.326V1.326C24 .6 23.4 0 22.675 0" />
            </svg>
        );
    } else if (type === "instagram") {
        icon = (
            <svg height="24" width="24" fill="#fff" viewBox="0 0 24 24" aria-label="Instagram">
                <path d="M12,2.163c3.204,0,3.584,0.012,4.85,0.07c1.366,0.062,2.633,0.342,3.608,1.316c0.974,0.974,1.254,2.242,1.316,3.608
          c0.058,1.266,0.069,1.646,0.069,4.85s-0.012,3.584-0.069,4.85c-0.062,1.366-0.342,2.633-1.316,3.608
          c-0.974,0.974-2.242,1.254-3.608,1.316c-1.266,0.058-1.646,0.069-4.85,0.069s-3.584-0.012-4.85-0.069
          c-1.366-0.062-2.633-0.342-3.608-1.316c-0.974-0.974-1.254-2.242-1.316-3.608c-0.058-1.266-0.069-1.646-0.069-4.85
          s0.012-3.584,0.069-4.85c0.062-1.366,0.342-2.633,1.316-3.608c0.974-0.974,2.242-1.254,3.608-1.316
          C8.416,2.175,8.796,2.163,12,2.163 M12,0C8.741,0,8.332,0.013,7.052,0.072C5.766,0.131,4.671,0.425,3.678,1.418
          C2.685,2.411,2.391,3.506,2.332,4.792C2.273,6.072,2.26,6.481,2.26,9.74s0.013,3.667,0.072,4.948
          c0.059,1.286,0.353,2.381,1.346,3.374c0.993,0.993,2.088,1.287,3.374,1.346c1.281,0.059,1.69,0.072,4.948,0.072
          s3.667-0.013,4.948-0.072c1.286-0.059,2.381-0.353,3.374-1.346c0.993-0.993,1.287-2.088,1.346-3.374
          c0.059-1.281,0.072-1.69,0.072-4.948s-0.013-3.667-0.072-4.948c-0.059-1.286-0.353-2.381-1.346-3.374
          c-0.993-0.993-2.088-1.287-3.374-1.346C15.667,0.013,15.259,0,12,0L12,0z"/>
                <path d="M12,5.838c-3.403,0-6.162,2.76-6.162,6.162c0,3.403,2.76,6.162,6.162,6.162
          c3.403,0,6.162-2.76,6.162-6.162C18.162,8.598,15.403,5.838,12,5.838z M12,15.6c-1.989,0-3.6-1.611-3.6-3.6
          c0-1.989,1.611-3.6,3.6-3.6c1.989,0,3.6,1.611,3.6,3.6C15.6,13.989,13.989,15.6,12,15.6z"/>
                <circle cx="18.406" cy="5.594" r="1.44" />
            </svg>
        );
    } else if (type === "linkedin") {
        icon = (
            <svg height="24" width="24" fill="#fff" viewBox="0 0 24 24" aria-label="LinkedIn">
                <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.77 24h20.459
        C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.23 0zM7.083 20.452H3.56V9.034h3.523v11.418zM5.322 7.704a2.042
        2.042 0 1 1 0-4.084 2.042 2.042 0 0 1 0 4.084zm15.13 12.748h-3.523v-5.569c0-1.328-.025-3.037-1.85-3.037-1.851 0-2.133
        1.445-2.133 2.939v5.667H9.423V9.034h3.384v1.561h.048c.473-.896 1.632-1.85 3.359-1.85 3.595 0 4.256 2.366 4.256
        5.444v6.263z"/>
            </svg>
        );
    } else {
        icon = null;
    }
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                margin: "0 8px",
                display: "inline-block",
                color: "inherit",
                verticalAlign: "middle"
            }}
            aria-label={type}
        >
            {icon}
        </a>
    );
}

function Home() {
    const navigate = useNavigate();
    const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
    const [showFullSignUpPopup, setShowFullSignUpPopup] = useState(false);
    const [showLoginFormPopup, setShowLoginFormPopup] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [showAllActivities, setShowAllActivities] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShowSignUpPrompt(true);
        }
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
            <Header
                showSignOutButton={true}
                showSingleLoginButton={true}
            />

            <div className="home-outer-container" style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "60px",
                flex: "1",
                width: "100%"
            }}>
                <div style={{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "20px"
                }}>
                    <div className="home-content" style={{
                        maxWidth: "1200px",
                        width: "100%",
                        marginTop: "30px",
                        padding: "0 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px"
                    }}>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "20px"
                        }}>
                            {[
                                { label: "Active Listings", value: "12", color: "#e3f2fd", textColor: "#1976d2" },
                                { label: "Pending Orders", value: "5", color: "#fff3e0", textColor: "#f57c00" },
                                { label: "Completed Orders", value: "48", color: "#e8f5e9", textColor: "#388e3c" },
                                { label: "Total Earnings", value: "₹1,240", color: "#fff8e1", textColor: "#ffa000" }
                            ].map((stat, index) => (
                                <div key={index} style={{
                                    background: "rgba(255, 255, 255, 0.95)",
                                    padding: "20px",
                                    borderRadius: "15px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                    borderLeft: `5px solid ${stat.textColor}`
                                }}>
                                    <span style={{ color: "#666", fontSize: "14px", fontFamily: "momo trust display" }}>{stat.label}</span>
                                    <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#333", fontFamily: "momo trust display" }}>{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="dashboard-grid">
                            <div style={{
                                background: "#fff",
                                padding: "25px",
                                borderRadius: "20px",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.02)",
                                border: "1px solid #eef0f7",
                                minHeight: "500px",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                                    <h3 style={{ color: "#1e293b", fontFamily: "momo trust display", margin: 0 }}>Recent Activity</h3>
                                    <button
                                        onClick={() => setShowAllActivities(true)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#3b82f6",
                                            textDecoration: "underline",
                                            fontSize: "14px",
                                            fontFamily: "momo trust display",
                                            cursor: "pointer"
                                        }}
                                    >
                                        See all
                                    </button>
                                </div>

                                <div style={{
                                    flex: 1,
                                    overflowY: "auto",
                                    paddingRight: "5px",
                                    maxHeight: "400px"
                                }} className="custom-scrollbar">
                                    {[
                                        { title: "New Message", desc: "You received a message from Sarah regarding 'Blue Jeans'", time: "2m ago", icon: "💬" },
                                        { title: "Order Shipped", desc: "Your order #12345 has been shipped", time: "1h ago", icon: "📦" },
                                        { title: "New Listing", desc: "Your 'Vintage Camera' is live", time: "3h ago", icon: "✨" },
                                        { title: "Offer Received", desc: "John offered ₹50 for 'Headphones'", time: "5h ago", icon: "🏷️" },
                                        { title: "Review Left", desc: "Alice left a 5-star review for you", time: "1d ago", icon: "⭐" },
                                        { title: "SoldCount", desc: "You sold 3 items this week!", time: "2d ago", icon: "📈" }
                                    ].map((item, i, arr) => (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedActivity(item)}
                                            style={{
                                                display: "flex",
                                                gap: "15px",
                                                padding: "15px",
                                                marginBottom: "10px",
                                                background: "#f8fafc",
                                                border: "1px solid #e2e8f0",
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                borderRadius: "15px",
                                                userSelect: "none",
                                                WebkitUserSelect: "none",
                                                MozUserSelect: "none",
                                                msUserSelect: "none"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!e.buttons) { // Only apply hover effect if no mouse buttons are pressed
                                                    e.currentTarget.style.transform = "translateX(5px)";
                                                    e.currentTarget.style.background = "#f1f5f9";
                                                    e.currentTarget.style.borderColor = "#cbd5e1";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!e.buttons) { // Only apply leave effect if no mouse buttons are pressed
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                    e.currentTarget.style.background = "#f8fafc";
                                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                                }
                                            }}
                                            onMouseDown={(e) => {
                                                // Prevent hover effects during drag
                                                e.currentTarget.style.transform = "translateX(0)";
                                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                                            }}
                                        >
                                            <div style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                background: "rgba(255, 255, 255, 0.2)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "20px",
                                                flexShrink: 0
                                            }}>{item.icon}</div>
                                            <div style={{
                                                flex: 1,
                                                userSelect: "none",
                                                WebkitUserSelect: "none",
                                                MozUserSelect: "none",
                                                msUserSelect: "none"
                                            }}>
                                                <h4 style={{
                                                    margin: "0 0 5px 0",
                                                    fontSize: "16px",
                                                    color: "#000",
                                                    fontFamily: "momo trust display",
                                                    userSelect: "none",
                                                    WebkitUserSelect: "none",
                                                    MozUserSelect: "none",
                                                    msUserSelect: "none"
                                                }}>{item.title}</h4>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: "14px",
                                                    color: "#000",
                                                    lineHeight: "1.4",
                                                    fontFamily: "momo trust display",
                                                    userSelect: "none",
                                                    WebkitUserSelect: "none",
                                                    MozUserSelect: "none",
                                                    msUserSelect: "none"
                                                }}>{item.desc}</p>
                                                <span style={{
                                                    fontSize: "12px",
                                                    color: "#666",
                                                    fontFamily: "momo trust display",
                                                    userSelect: "none",
                                                    WebkitUserSelect: "none",
                                                    MozUserSelect: "none",
                                                    msUserSelect: "none"
                                                }}>{item.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div style={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    padding: "25px",
                                    borderRadius: "20px",
                                    color: "#fff",
                                    cursor: "pointer",
                                    transition: "transform 0.2s",
                                    boxShadow: "0 8px 20px rgba(68, 129, 235, 0.3)"
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                                >
                                    <div style={{ fontSize: "24px", marginBottom: "10px" }}>+</div>
                                    <h3 style={{ margin: 0, color: "white", fontFamily: "momo trust display" }}>Create Listing</h3>
                                    <p style={{ margin: "5px 0 0 0", color: "white", fontSize: "14px", opacity: 0.9, fontFamily: "momo trust display" }}>Exchange your items</p>
                                </div>

                                <div style={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    padding: "25px",
                                    borderRadius: "20px",
                                    color: "#fff",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 8px 20px rgba(142, 68, 173, 0.3)"
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                                >
                                    <h3 style={{ margin: 0, color: "white", fontFamily: "momo trust display" }}>Trending categories</h3>
                                    <p style={{ margin: "5px 0 0 0", color: "white", fontSize: "14px", opacity: 0.9, fontFamily: "momo trust display" }}>Explore popular items</p>

                                    <div style={{
                                        marginTop: "20px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px"
                                    }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate("/books");
                                            }}
                                            style={{
                                                padding: "12px 15px",
                                                background: "rgba(255, 255, 255, 0.2)",
                                                color: "#fff",
                                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                fontFamily: "momo trust display",
                                                textAlign: "left",
                                                transition: "all 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.3)"}
                                            onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
                                        >
                                            Books
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate("/collectables");
                                            }}
                                            style={{
                                                padding: "12px 15px",
                                                background: "rgba(255, 255, 255, 0.2)",
                                                color: "#fff",
                                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                fontFamily: "momo trust display",
                                                textAlign: "left",
                                                transition: "all 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.3)"}
                                            onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
                                        >
                                            Collectables
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate("/electronics");
                                            }}
                                            style={{
                                                padding: "12px 15px",
                                                background: "rgba(255, 255, 255, 0.2)",
                                                color: "#fff",
                                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                fontFamily: "momo trust display",
                                                textAlign: "left",
                                                transition: "all 0.2s ease"
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.3)"}
                                            onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
                                        >
                                            Electronics
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            marginTop: "20px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            padding: "25px",
                            borderRadius: "20px",
                            boxShadow: "0 8px 32px rgba(118, 75, 162, 0.4)"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                                <h3 style={{ margin: 0, color: "white", fontFamily: "momo trust display" }}>Recommended for You</h3>
                                <a href="javascript:void(0)" style={{ color: "rgba(255, 255, 255, 0.8)", textDecoration: "underline", fontSize: "14px", fontFamily: "momo trust display" }}>See more</a>
                            </div>
                            <div className="recommended-grid">
                                {[
                                    {
                                        name: "Vintage Camera",
                                        price: "4,500",
                                        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8GNhbWVyYXxlbnwwfHwwfHw%3D",
                                        category: "Electronics"
                                    },
                                    {
                                        name: "Blue Jeans",
                                        price: "1,200",
                                        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fA%3D%3D",
                                        category: "Fashion"
                                    },
                                    {
                                        name: "Headphones",
                                        price: "2,500",
                                        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8GhlhZHBob25lc3xlbnwwfHwwfHw%3D",
                                        category: "Electronics"
                                    },
                                    {
                                        name: "Gaming Console",
                                        price: "25,000",
                                        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwY29uc29sZXxlbnwwfHwwfHw%3D",
                                        category: "Electronics"
                                    }
                                ].map((item, index) => (
                                    <div key={index}
                                        onClick={() => setSelectedActivity({
                                            title: item.name,
                                            desc: `Price: ₹${item.price}. This ${item.category} item is highly recommended based on your browsing history. Click to view details and make an offer!`,
                                            time: "Featured",
                                            icon: "🛍️"
                                        })}
                                        style={{
                                            background: "rgba(255, 255, 255, 0.2)",
                                            border: "1px solid rgba(255, 255, 255, 0.3)",
                                            borderRadius: "15px",
                                            padding: "15px",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            textAlign: "center",
                                            overflow: "hidden"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.35)";
                                            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0) scale(1)";
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <div style={{
                                            height: "120px",
                                            borderRadius: "10px",
                                            marginBottom: "12px",
                                            overflow: "hidden",
                                            background: "#f8f9fa"
                                        }}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition: "transform 0.3s ease"
                                                }}
                                                onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                                                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                            />
                                        </div>
                                        <h4 style={{
                                            margin: "0 0 6px 0",
                                            fontSize: "15px",
                                            color: "white",
                                            fontFamily: "momo trust display",
                                            fontWeight: "600"
                                        }}>{item.name}</h4>
                                        <p style={{
                                            margin: "0 0 4px 0",
                                            color: "rgba(255, 255, 255, 0.8)",
                                            fontSize: "12px",
                                            fontFamily: "momo trust display"
                                        }}>{item.category}</p>
                                        <p style={{
                                            margin: 0,
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            fontFamily: "momo trust display"
                                        }}>₹{item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />


            {showSignUpPrompt && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 3000
                }}>
                    <div style={{
                        background: "white",
                        borderRadius: "12px",
                        padding: "30px",
                        maxWidth: "450px",
                        width: "90%",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
                        textAlign: "center",
                        fontFamily: "momo trust display",
                        position: "relative"
                    }}>
                        <button
                            onClick={() => setShowSignUpPrompt(false)}
                            style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#666" }}
                        >
                            ×
                        </button>
                        <div style={{ fontSize: "48px", marginBottom: "20px" }}>🚀</div>
                        <h3 style={{ margin: "0 0 15px 0", color: "#333", fontSize: "24px", fontWeight: "600" }}>Join Barter Portal!</h3>
                        <p style={{ margin: "0 0 25px 0", color: "#666", fontSize: "16px", lineHeight: "1.6" }}>Create an account to unlock all features including personalized recommendations and more!</p>
                        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                            <button
                                style={{ padding: "14px 28px", background: "#667eea", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "600", fontFamily: "momo trust display" }}
                                onClick={() => { setShowSignUpPrompt(false); setShowFullSignUpPopup(true); }}
                            >
                                Sign Up Now
                            </button>
                            <button
                                style={{ padding: "14px 28px", background: "#f8f9fa", color: "#666", border: "2px solid #e9ecef", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "600", fontFamily: "momo trust display" }}
                                onClick={() => setShowSignUpPrompt(false)}
                            >
                                Continue Browsing
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showFullSignUpPopup && (
                <SignUpFormPopup
                    onClose={() => setShowFullSignUpPopup(false)}
                    onSignUpSuccess={() => {
                        localStorage.setItem("isAuthenticated", "true");
                        setIsAuthenticated(true);
                        navigate("/home");
                        setShowFullSignUpPopup(false);
                    }}
                />
            )}

            {showLoginFormPopup && (
                <LoginFormPopup
                    onClose={() => setShowLoginFormPopup(false)}
                    onLoginSuccess={() => {
                        localStorage.setItem("isAuthenticated", "true");
                        setIsAuthenticated(true);
                        navigate("/home");
                        setShowLoginFormPopup(false);
                    }}
                />
            )}

            {(selectedActivity || showAllActivities) && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 4000,
                    backdropFilter: "blur(5px)"
                }} onClick={() => {
                    setSelectedActivity(null);
                    setShowAllActivities(false);
                }}>
                    <div style={{
                        background: "white",
                        borderRadius: "20px",
                        padding: "30px",
                        maxWidth: "500px",
                        width: "90%",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                        position: "relative",
                        animation: "modalFadeIn 0.3s ease"
                    }} onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => {
                                setSelectedActivity(null);
                                setShowAllActivities(false);
                            }}
                            style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#666" }}
                        >
                            ×
                        </button>

                        {selectedActivity && (
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "60px", marginBottom: "20px" }}>{selectedActivity.icon}</div>
                                <h3 style={{ fontSize: "24px", color: "#333", marginBottom: "10px", fontFamily: "momo trust display" }}>{selectedActivity.title}</h3>
                                <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6", marginBottom: "20px", fontFamily: "momo trust display" }}>{selectedActivity.desc}</p>
                                <span style={{ fontSize: "14px", color: "#999", fontFamily: "momo trust display" }}>{selectedActivity.time}</span>
                            </div>
                        )}

                        {showAllActivities && (
                            <div>
                                <h3 style={{ fontSize: "24px", color: "#333", marginBottom: "20px", fontFamily: "momo trust display" }}>All Activities</h3>
                                <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "10px" }} className="custom-scrollbar-dark">
                                    {[
                                        { title: "New Message", desc: "You received a message from Sarah regarding 'Blue Jeans'", time: "2m ago", icon: "💬" },
                                        { title: "Order Shipped", desc: "Your order #12345 has been shipped", time: "1h ago", icon: "📦" },
                                        { title: "New Listing", desc: "Your 'Vintage Camera' is live", time: "3h ago", icon: "✨" },
                                        { title: "Offer Received", desc: "John offered ₹50 for 'Headphones'", time: "5h ago", icon: "🏷️" },
                                        { title: "Review Left", desc: "Alice left a 5-star review for you", time: "1d ago", icon: "⭐" },
                                        { title: "SoldCount", desc: "You sold 3 items this week!", time: "2d ago", icon: "📈" },
                                        { title: "System Update", desc: "Platfrom updated to version 2.1", time: "3d ago", icon: "🛠️" },
                                        { title: "New Feature", desc: "Dark mode is now available in settings", time: "4d ago", icon: "🌙" }
                                    ].map((item, i, arr) => (
                                        <div key={i} style={{
                                            display: "flex",
                                            gap: "15px",
                                            padding: "15px 0",
                                            borderBottom: i < arr.length - 1 ? "1px solid #f0f0f0" : "none"
                                        }}>
                                            <div style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                background: "#f8f9fa",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "20px",
                                                flexShrink: 0
                                            }}>{item.icon}</div>
                                            <div>
                                                <h4 style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#333", fontFamily: "momo trust display" }}>{item.title}</h4>
                                                <p style={{ margin: 0, fontSize: "14px", color: "#666", lineHeight: "1.4", fontFamily: "momo trust display" }}>{item.desc}</p>
                                                <span style={{ fontSize: "12px", color: "#999", fontFamily: "momo trust display" }}>{item.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
