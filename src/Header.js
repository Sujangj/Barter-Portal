import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginFormPopup from "./LoginFormPopup";
import SignUpFormPopup from "./SignUpFormPopup";
import { LOGO_URL, LOGIN_HEADER_BG } from "./constants";

function Header({ showSignOutButton, onSignOut, showSingleLoginButton, hideNavigation }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLoginFormPopup, setShowLoginFormPopup] = useState(false);
    const [showFullSignUpPopup, setShowFullSignUpPopup] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const profileDropdownRef = useRef(null);
    const dropdownTimeoutRef = useRef(null);

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    const handleSignOut = () => {
        localStorage.setItem("isAuthenticated", "false");
        localStorage.removeItem("userAddresses");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPhone");
        window.location.href = "/";
    };

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
    }, []);

    const profileDropdownStyle = {
        position: "absolute",
        top: "45px",
        right: "0",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        border: "1px solid #e9ecef",
        minWidth: "180px",
        zIndex: 1000,
        padding: "8px 0",
        fontFamily: "momo trust display"
    };

    // Flag to determine if all buttons should be hidden (Cart page)
    const isCartPage = location.pathname === '/cart';
    // Flag for landing page logic
    const isLandingPage = location.pathname === '/';

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "60px",
                background: "#FFFFFF",
                boxShadow: "0 3px 14px 0 rgba(143,148,251,0.10)",
                zIndex: 1201,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "32px",
                paddingRight: "32px",
            }}
        >
            {/* Left Side: Logo and Barterportal */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    cursor: isCartPage ? 'default' : 'pointer'
                }}
                onClick={() => !isCartPage && navigate('/home')}
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
                        boxShadow: "0 1.5px 4px 0 rgba(143,148,251,0.09)"
                    }}
                />
                <span
                    style={{
                        fontWeight: "bold",
                        fontSize: "2.5rem",
                        color: "#184872",
                        letterSpacing: "0.02em",
                        fontFamily: "momo trust display",
                        whiteSpace: "nowrap"
                    }}
                >
                    Barterportal
                </span>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "22px"
                }}
            >
                {/* Main Navigation - Hidden on landing page AND cart page AND when hideNavigation is true */}
                {!isLandingPage && !isCartPage && !hideNavigation && (
                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center', marginRight: '10px' }}>
                        <div
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: location.pathname === '/home' ? '#3b82f6' : '#64748b', cursor: 'pointer', fontFamily: 'momo trust display' }}
                            onClick={() => navigate('/home')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            <span style={{ fontWeight: location.pathname === '/home' ? '700' : '600', fontSize: '14px' }}>Dashboard</span>
                        </div>
                        <div
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: location.pathname === '/browse' ? '#3b82f6' : '#64748b', cursor: 'pointer', fontFamily: 'momo trust display' }}
                            onClick={() => navigate('/browse')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <span style={{ fontWeight: location.pathname === '/browse' ? '700' : '600', fontSize: '14px' }}>Browse</span>
                        </div>
                        <div
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: location.pathname === '/myorders' ? '#3b82f6' : '#64748b', position: 'relative', cursor: 'pointer', fontFamily: 'momo trust display' }}
                            onClick={() => navigate('/myorders')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            <span style={{ fontWeight: location.pathname === '/myorders' ? '700' : '600', fontSize: '14px' }}>My Orders</span>
                            <div style={{ position: 'absolute', top: -8, right: 65, background: '#ef4444', color: 'white', fontSize: '10px', width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                        </div>
                    </div>
                )}

                {/* Authentication Section - Hidden on cart page and when hideNavigation is true */}
                {!isCartPage && !hideNavigation && (
                    <>
                        {isAuthenticated ? (
                            <div style={{ position: "relative" }} ref={profileDropdownRef}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', color: location.pathname === '/myprofile' ? '#3b82f6' : '#64748b', cursor: 'pointer', fontFamily: 'momo trust display' }}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setShowProfileDropdown(!showProfileDropdown);
                                    }}
                                >
                                    <div style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                        background: "#667eea",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 2px 6px rgba(102,126,234,0.2)"
                                    }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <span style={{ fontWeight: location.pathname === '/myprofile' ? '700' : '600', fontSize: '14px' }}>Profile</span>
                                </div>

                                {showProfileDropdown && (
                                    <div
                                        style={{
                                            ...profileDropdownStyle,
                                            opacity: showProfileDropdown ? 1 : 0,
                                            transform: showProfileDropdown ? "translateY(0)" : "translateY(-10px)",
                                            pointerEvents: showProfileDropdown ? "auto" : "none",
                                            transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                                        }}
                                    >
                                        <button
                                            style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "12px 20px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "#333", transition: "all 0.2s ease", fontFamily: "momo trust display" }}
                                            onMouseEnter={(e) => e.target.style.background = "#f8f9fa"}
                                            onMouseLeave={(e) => e.target.style.background = "transparent"}
                                            onClick={() => {
                                                navigate("/commyprofile", { state: { source: 'home' } });
                                                setShowProfileDropdown(false);
                                            }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            My Profile
                                        </button>
                                        {showSignOutButton && (
                                            <button
                                                style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "12px 20px", background: "#dc3545", border: "none", textAlign: "left", cursor: "pointer", fontSize: "14px", fontWeight: "600", color: "white", transition: "all 0.2s ease", fontFamily: "momo trust display", marginTop: '5px' }}
                                                onMouseEnter={(e) => e.target.style.background = "#c82333"}
                                                onMouseLeave={(e) => e.target.style.background = "#dc3545"}
                                                onClick={() => setShowLogoutConfirm(true)}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                    <polyline points="16 17 21 12 16 7" />
                                                    <line x1="21" y1="12" x2="9" y2="12" />
                                                </svg>
                                                Sign Out
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    style={{
                                        minWidth: "120px",
                                        padding: "10px 15px",
                                        fontFamily: "momo trust display",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        borderRadius: "8px",
                                        background: "#667eea",
                                        color: "white",
                                        border: "none",
                                        cursor: "pointer",
                                        boxShadow: "0px 3px 8px rgba(40,116,240,0.28)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        transition: "all 0.3s ease",
                                    }}
                                    onClick={() => setShowLoginFormPopup(true)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "white" }}>
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    Login
                                </button>
                                {isLandingPage && (
                                    <button
                                        style={{
                                            minWidth: "120px",
                                            padding: "10px 15px",
                                            fontFamily: "momo trust display",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            borderRadius: "8px",
                                            background: "white",
                                            color: "#667eea",
                                            border: "2px solid #667eea",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            transition: "all 0.3s ease",
                                        }}
                                        onClick={() => setShowFullSignUpPopup(true)}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <line x1="20" y1="8" x2="20" y2="14" />
                                            <line x1="23" y1="11" x2="17" y2="11" />
                                        </svg>
                                        Sign up
                                    </button>
                                )}
                            </div>
                        )}
                    </>
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

            {showLogoutConfirm && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2000
                }}>
                    <div style={{
                        background: "white",
                        borderRadius: "12px",
                        padding: "30px",
                        maxWidth: "400px",
                        width: "90%",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                        textAlign: "center",
                        fontFamily: "momo trust display"
                    }}>
                        <h3 style={{ margin: "0 0 15px 0", color: "#333", fontSize: "20px", fontWeight: "600" }}>Confirm Sign Out</h3>
                        <p style={{ margin: "0 0 25px 0", color: "#666", fontSize: "16px", lineHeight: "1.5" }}>Are you sure you want to sign out?</p>
                        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                            <button
                                style={{ padding: "12px 24px", background: "#dc3545", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px", fontWeight: "600", fontFamily: "momo trust display" }}
                                onClick={handleSignOut}
                            >
                                Leave
                            </button>
                            <button
                                style={{ padding: "12px 24px", background: "#6c757d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px", fontWeight: "600", fontFamily: "momo trust display" }}
                                onClick={() => setShowLogoutConfirm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
