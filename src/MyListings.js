import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function MyListings() {
    const navigate = useNavigate();
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [uploadedListings, setUploadedListings] = useState(() => {
        const saved = localStorage.getItem('userListings');
        return saved ? JSON.parse(saved) : [];
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

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
            <Header showSignOutButton={true} showSingleLoginButton={true} />

            <div style={{
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
                    <div style={{
                        maxWidth: "1200px",
                        width: "100%",
                        marginTop: "30px",
                        padding: "0 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px"
                    }}>

                        {/* Page Header */}
                        <div style={{
                            textAlign: "center",
                            marginBottom: "20px"
                        }}>
                            <h1 style={{
                                color: "white",
                                fontSize: "36px",
                                fontWeight: "bold",
                                fontFamily: "momo trust display",
                                margin: "0 0 10px 0"
                            }}>
                                My Listings
                            </h1>
                            <p style={{
                                color: "rgba(255, 255, 255, 0.8)",
                                fontSize: "16px",
                                fontFamily: "momo trust display",
                                margin: 0
                            }}>
                                Manage and view all your active product listings
                            </p>
                        </div>

                        {/* Listings Section */}
                        {uploadedListings.length > 0 ? (
                            <div style={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                padding: "25px",
                                borderRadius: "20px",
                                boxShadow: "0 8px 32px rgba(118, 75, 162, 0.4)"
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "20px"
                                }}>
                                    <h3 style={{
                                        margin: 0,
                                        color: "white",
                                        fontFamily: "momo trust display",
                                        fontSize: "24px"
                                    }}>
                                        Active Listings
                                    </h3>
                                    <span style={{
                                        color: "rgba(255, 255, 255, 0.8)",
                                        fontSize: "14px",
                                        fontFamily: "momo trust display"
                                    }}>
                                        {uploadedListings.length} active listing{uploadedListings.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="recommended-grid">
                                    {uploadedListings.map((listing) => (
                                        <div key={listing.id}
                                            onClick={() => setSelectedActivity({
                                                title: listing.name,
                                                desc: `${listing.description}\n\nCategory: ${listing.category}\nCondition: ${listing.condition}\nListed on: ${listing.dateListed}`,
                                                time: "My Listing",
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
                                                    src={listing.image}
                                                    alt={listing.name}
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
                                            }}>{listing.name}</h4>
                                            <p style={{
                                                margin: "0 0 4px 0",
                                                color: "rgba(255, 255, 255, 0.8)",
                                                fontSize: "12px",
                                                fontFamily: "momo trust display"
                                            }}>{listing.category}</p>
                                            <p style={{
                                                margin: 0,
                                                color: "white",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                fontFamily: "momo trust display"
                                            }}>₹{listing.price || 'Contact for price'}</p>
                                            <div style={{
                                                marginTop: "8px",
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: "5px"
                                            }}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        alert(`Edit "${listing.name}"? Edit feature coming soon!`);
                                                    }}
                                                    style={{
                                                        padding: "6px 12px",
                                                        background: "rgba(255, 255, 255, 0.2)",
                                                        color: "white",
                                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "12px",
                                                        fontFamily: "momo trust display",
                                                        transition: "all 0.2s ease"
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm(`Are you sure you want to delete "${listing.name}"?`)) {
                                                            const updatedListings = uploadedListings.filter(l => l.id !== listing.id);
                                                            setUploadedListings(updatedListings);
                                                            localStorage.setItem('userListings', JSON.stringify(updatedListings));
                                                        }
                                                    }}
                                                    style={{
                                                        padding: "6px 12px",
                                                        background: "rgba(220, 53, 69, 0.8)",
                                                        color: "white",
                                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "12px",
                                                        fontFamily: "momo trust display",
                                                        transition: "all 0.2s ease"
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(220, 53, 69, 0.9)"}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(220, 53, 69, 0.8)"}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                background: "rgba(255, 255, 255, 0.95)",
                                padding: "40px",
                                borderRadius: "20px",
                                textAlign: "center",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                            }}>
                                <div style={{ fontSize: "64px", marginBottom: "20px" }}>📦</div>
                                <h3 style={{
                                    color: "#333",
                                    fontFamily: "momo trust display",
                                    margin: "0 0 10px 0"
                                }}>
                                    No Listings Yet
                                </h3>
                                <p style={{
                                    color: "#666",
                                    fontFamily: "momo trust display",
                                    margin: "0 0 20px 0",
                                    fontSize: "16px"
                                }}>
                                    You haven't created any listings yet. Start by creating your first listing!
                                </p>
                                <button
                                    onClick={() => navigate('/home')}
                                    style={{
                                        background: "#667eea",
                                        color: "white",
                                        border: "none",
                                        padding: "12px 24px",
                                        borderRadius: "25px",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        fontFamily: "momo trust display",
                                        transition: "all 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = "#5a67d8"}
                                    onMouseLeave={(e) => e.currentTarget.style.background = "#667eea"}
                                >
                                    Create Your First Listing
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {/* Activity Modal */}
            {(selectedActivity) && (
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
                }} onClick={() => setSelectedActivity(null)}>
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
                            onClick={() => setSelectedActivity(null)}
                            style={{
                                position: "absolute",
                                top: "20px",
                                right: "20px",
                                background: "none",
                                border: "none",
                                fontSize: "24px",
                                cursor: "pointer",
                                color: "#666"
                            }}
                        >
                            ×
                        </button>

                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "60px", marginBottom: "20px" }}>{selectedActivity.icon}</div>
                            <h3 style={{
                                fontSize: "24px",
                                color: "#333",
                                marginBottom: "10px",
                                fontFamily: "momo trust display"
                            }}>
                                {selectedActivity.title}
                            </h3>
                            <p style={{
                                fontSize: "16px",
                                color: "#666",
                                lineHeight: "1.6",
                                marginBottom: "20px",
                                fontFamily: "momo trust display",
                                whiteSpace: "pre-line"
                            }}>
                                {selectedActivity.desc}
                            </p>
                            <span style={{
                                fontSize: "14px",
                                color: "#999",
                                fontFamily: "momo trust display"
                            }}>
                                {selectedActivity.time}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyListings;