import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginFormPopup from "./LoginFormPopup";
import SignUpFormPopup from "./SignUpFormPopup";

const LOGO_URL =
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRcsGEl_k_ju03oX1HX_A9lK-VvqKCm0WVdABkw4Y3k6uvo4zw45lzrgevt2B4CDWJNAOpAV8D8";

const LOGIN_HEADER_BG = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

function Header({ showSignOutButton, onSignOut, showSingleLoginButton }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLoginFormPopup, setShowLoginFormPopup] = useState(false);
    const [showFullSignUpPopup, setShowFullSignUpPopup] = useState(false);
    const [headerLoginPressed, setHeaderLoginPressed] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
    const profileDropdownRef = useRef(null);
    const dropdownTimeoutRef = useRef(null);

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";


    // Close profile dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
            }
        };
    }, []); // Empty dependency array since profileDropdownRef is stable

    // SVG Icon Components
    const ProfileIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    );

    const OrdersIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
    );

    const WishlistIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
    );

    const RewardsIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="7"/>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
        </svg>
    );

    const ReferEarnIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M19 8v6"/>
            <path d="M22 11h-6"/>
        </svg>
    );

    const menuItems = [
        { text: "My Profile", icon: <ProfileIcon /> },
        { text: "Orders", icon: <OrdersIcon /> },
        { text: "Wishlist", icon: <WishlistIcon /> },
        { text: "Rewards", icon: <RewardsIcon /> },
        { text: "Refer & Earn", icon: <ReferEarnIcon /> },
    ];

    const headerButtonStyle = {
        minWidth: "140px",
        width: "140px",
        padding: "13px 20px",
        fontFamily: "'momo trust display', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
        fontWeight: "bold",
        fontSize: "16px",
        borderRadius: "8px",
        background: LOGIN_HEADER_BG,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        boxShadow: "0px 3px 8px rgba(140,148,251,0.09)",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        willChange: "transform",
        textTransform: "none"
    };

    const pressedButtonStyle = {
        transform: "scale(0.96) translateY(1.5px)"
    };

    const headerBgColor = "#FFFFFF";

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "60px",
                background: headerBgColor,
                boxShadow: "0 3px 14px 0 rgba(143,148,251,0.10)",
                zIndex: 1201,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "32px",
                paddingRight: "32px",
            }}
        >
            {/* Left Side: Logo and Barter Portal */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    minWidth: 0,
                }}
            >
                <img
                    src={LOGO_URL}
                    alt="Barter Portal Logo"
                    style={{
                        height: "46px",
                        width: "46px",
                        objectFit: "contain",
                        marginRight: "18px",
                        borderRadius: "8px",
                        background: "#f2f3fb",
                        boxShadow: "0 1.5px 4px 0 rgba(143,148,251,0.09)"
                    }}
                />
                <span
                    style={{
                        fontWeight: "bold",
                        fontSize: "2.5rem",
                        color: "#184872",
                        letterSpacing: "0.02em",
                        fontFamily: "'momo trust display', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
                        whiteSpace: "nowrap"
                    }}
                >
                    Barter Portal
                </span>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "22px"
                }}
            >
                {!isAuthenticated ? (
                    // For Cart, Books, Collectables, Electronics, Others, About, Contact, and MyProfile pages, don't show any buttons
                    (location.pathname === '/cart' || location.pathname === '/books' || location.pathname === '/collectables' || location.pathname === '/electronics' ||
                     location.pathname === '/others' || location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/myprofile') ? null : (
                        showSingleLoginButton ? (
                        <div
                                onMouseEnter={() => setShowProfileDropdown(true)}
                                onMouseLeave={() => {
                                    // Only hide if not hovering over dropdown
                                    if (dropdownTimeoutRef.current) {
                                        clearTimeout(dropdownTimeoutRef.current);
                                    }
                                    dropdownTimeoutRef.current = setTimeout(() => {
                                        if (!isHoveringDropdown) {
                                            setShowProfileDropdown(false);
                                        }
                                    }, 100);
                                }}
                                style={{ position: "relative", zIndex: 1 }}
                            >
                                <button
                                    style={{
                                        minWidth: "120px",
                                        width: "120px",
                                        padding: "10px 15px",
                                        fontFamily: "'momo trust display', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        borderRadius: "8px",
                                        background: "#667eea",
                                        color: "white",
                                        border: "none",
                                        cursor: "pointer",
                                        boxShadow: "0px 3px 8px rgba(40,116,240,0.28)",
                                        textAlign: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        whiteSpace: "nowrap",
                                        transition: "all 0.3s ease",
                                        textTransform: "none",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowLoginFormPopup(true);
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "white" }}>
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    Login
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "white" }}>
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                {showProfileDropdown && (
                                    <div
                                        ref={profileDropdownRef}
                                        style={{
                                            position: "absolute",
                                            top: "calc(100% + 5px)",
                                            right: "-20px",
                                            background: "white",
                                            borderRadius: "8px",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                                            border: "1px solid #e9ecef",
                                            minWidth: "240px",
                                            zIndex: 1000,
                                            padding: "0",
                                            fontFamily: "momo trust display",
                                            opacity: showProfileDropdown ? 1 : 0,
                                            transform: showProfileDropdown ? "translateY(0)" : "translateY(-10px)",
                                            transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                                            pointerEvents: showProfileDropdown ? "auto" : "none",
                                        }}
                                        onMouseEnter={() => {
                                            setIsHoveringDropdown(true);
                                            setShowProfileDropdown(true);
                                        }}
                                        onMouseLeave={() => {
                                            setIsHoveringDropdown(false);
                                            // Hide menu after a short delay to allow mouse to move
                                            if (dropdownTimeoutRef.current) {
                                                clearTimeout(dropdownTimeoutRef.current);
                                            }
                                            dropdownTimeoutRef.current = setTimeout(() => {
                                                setShowProfileDropdown(false);
                                            }, 100);
                                        }}
                                    >
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "16px 20px",
                                            borderBottom: "1px solid #eee",
                                            fontFamily: "momo trust display",
                                        }}>
                                            <span style={{ color: "#555", fontSize: "14px" }}>New customer?</span>
                                            <button
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    color: "#2874f0",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                    fontSize: "15px",
                                                    fontFamily: "momo trust display",
                                                }}
                                                onClick={() => {
                                                    setShowProfileDropdown(false);
                                                    setShowFullSignUpPopup(true);
                                                }}
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                        {menuItems.map((item, index) => (
                                            <button
                                                key={index}
                                                style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "12px 20px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "#333", transition: "all 0.2s ease" }}
                                                onMouseEnter={(e) => e.target.style.background = "#f8f9fa"}
                                                onMouseLeave={(e) => e.target.style.background = "transparent"}
                                                onClick={() => {
                                                    if (item.text === "My Profile") {
                                                        if (isAuthenticated) {
                                                            // My Profile only accessible from Buy page
                                                            alert("My Profile is only accessible from the Buy page.");
                                                        } else {
                                                            setShowLoginFormPopup(true);
                                                        }
                                                    } else {
                                                        alert(`Clicked ${item.text}`); // Placeholder for other menu items
                                                    }
                                                }}
                                            >
                                                {item.icon}
                                                {item.text}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                    ) : (
                        <>
                            <button
                            className="login-button"
                            style={{
                                ...headerButtonStyle,
                                ...(headerLoginPressed ? pressedButtonStyle : {})
                            }}
                            onClick={() => setShowLoginFormPopup(true)}
                            onMouseDown={() => setHeaderLoginPressed(true)}
                            onMouseUp={() => setHeaderLoginPressed(false)}
                            onMouseLeave={() => setHeaderLoginPressed(false)}
                            onTouchStart={() => setHeaderLoginPressed(true)}
                            onTouchEnd={() => setHeaderLoginPressed(false)}
                        >
                            Login
                        </button>
                        <button
                            className="signup-button"
                            style={{
                                ...headerButtonStyle,
                            }}
                            onClick={() => setShowFullSignUpPopup(true)}
                        >
                            Sign Up
                        </button>
                    </>
                    )
                )
                ) : (
                    // For Cart, Books, Collectables, Electronics, Others, About, Contact, and MyProfile pages, don't show any button
                    (location.pathname === '/cart' || location.pathname === '/books' || location.pathname === '/collectables' ||
                     location.pathname === '/electronics' || location.pathname === '/others' || location.pathname === '/about' ||
                     location.pathname === '/contact' || location.pathname === '/myprofile') ? null : (
                    // Placeholder for authenticated user dropdown/buttons
                    <React.Fragment>
                            {showSignOutButton ? (
                                <button
                                    style={{
                                        ...headerButtonStyle,
                                        background: "#dc3545"
                                    }}
                                    onClick={onSignOut}
                                    onMouseEnter={(e) => e.target.style.background = "#c82333"}
                                    onMouseLeave={(e) => e.target.style.background = "#dc3545"}
                                >
                                    Sign Out
                                </button>
                        ) : (
                            <button
                                style={{
                                    ...headerButtonStyle,
                                }}
                                        onClick={() => navigate("/home")}
                            >
                                        Home
                            </button>
                        )}
                    </React.Fragment>
                    )
                )}
            </div>
            {showLoginFormPopup && (
                <LoginFormPopup
                    onClose={() => setShowLoginFormPopup(false)}
                    onLoginSuccess={() => {
                        localStorage.setItem("isAuthenticated", "true");
                        setShowLoginFormPopup(false);
                        navigate("/home");
                    }}
                />
            )}
            {showFullSignUpPopup && (
                <SignUpFormPopup
                    onClose={() => setShowFullSignUpPopup(false)}
                    onSignUpSuccess={() => {
                        setShowFullSignUpPopup(false);
                        setShowLoginFormPopup(true);
                    }}
                />
            )}
        </header>
    );
}

export default Header;

