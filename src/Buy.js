import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpFormPopup from "./SignUpFormPopup"; // Import SignUpFormPopup
import LoginFormPopup from "./LoginFormPopup"; // Import LoginFormPopup
import { LOGO_URL } from "./constants";
import "./Buy.css";

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
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.48v-9.294H9.692V11.01h3.114V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.314h3.587l-.467 3.696h-3.12V24h6.116c.726 0 1.326-.6 1.326-1.326V1.326C24 .6 23.4 0 22.675 0" />
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

// Buy page component
const menuItems = [
    { text: "My Profile", icon: "<path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/>" },
    { text: "Orders", icon: "<path d=\"M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"/><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"/><path d=\"M16 10a4 4 0 0 1-8 0\"/>" },
    { text: "Wishlist", icon: "<path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/>" },
    { text: "Rewards", icon: "<circle cx=\"12\" cy=\"8\" r=\"7\"/><polyline points=\"8.21 13.89 7 23 12 20 17 23 15.79 13.88\"/>" },
    { text: "Refer & Earn", icon: "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M19 8v6\"/><path d=\"M22 11h-6\"/>" },
];

function Buy() {
    const navigate = useNavigate();
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
    const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
    const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
    const [showFullSignUpPopup, setShowFullSignUpPopup] = useState(false); // New state for full signup popup
    const [showLoginFormPopup, setShowLoginFormPopup] = useState(false); // New state for login form popup
    const [isAuthenticated, setIsAuthenticated] = useState(() => { // Changed to allow setting
        return localStorage.getItem("isAuthenticated") === "true";
    });
    const searchInputRef = useRef(null);
    const profileDropdownRef = useRef(null); // Add useRef for profile dropdown
    const searchTimeoutRef = useRef(null);

    // Show sign up prompt for unauthenticated users on component mount
    useEffect(() => {
        if (!isAuthenticated) {
            setShowSignUpPrompt(true);
        }
    }, [isAuthenticated]);

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
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [profileDropdownRef, setShowProfileDropdown]);


    const searchIconButtonStyle = {
        background: "none",
        border: "none",
        padding: "0 6px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        height: "40px",
        width: "40px",
        justifyContent: "center",
        marginRight: "2px",
        transition: "background 0.2s",
        borderRadius: "50%",
        fontFamily: "momo trust display", // ensure search icon button text would use it
    };

    const searchButtonStyle = {
        padding: "8px 20px",
        marginLeft: "0px",
        fontWeight: "bold",
        fontSize: "1em",
        borderRadius: "8px",
        border: "none",
        background: "#667eea",
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0px 2px 6px rgba(102,126,234,0.17)",
        transition: "all 0.2s",
        opacity: showSearchBar ? 1 : 0,
        pointerEvents: showSearchBar ? "auto" : "none",
        height: "41.45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "85px",
        fontFamily: "momo trust display", // updated
    };

    const searchBarTransitionStyle = {
        width: showSearchBar ? "220px" : "0px",
        opacity: showSearchBar ? 1 : 0,
        marginRight: "0px",
        transition: "width 0.35s cubic-bezier(0.7,0.2,0.15,1.18), opacity 0.22s",
        border: "1.5px solid #c0bafd",
        fontSize: "1em",
        outline: "none",
        padding: showSearchBar ? "7px 28px 7px 12px" : "7px 0px",
        borderRadius: "8px",
        background: "#fff",
        color: "#373b5e",
        boxShadow: showSearchBar ? "0 0px 8px rgba(143, 148, 251, 0.08)" : "none",
        pointerEvents: showSearchBar ? "auto" : "none",
        height: "41.45px",
        fontFamily: "momo trust display", // updated
    };

    function SearchIcon() {
        return (
            <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: "block" }}
            >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
        );
    }

    const handleSearchClick = () => {
        setShowSearchBar((prev) => {
            const willShow = !prev;
            if (!prev) {
                if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                }
                searchTimeoutRef.current = setTimeout(() => {
                    searchInputRef.current && searchInputRef.current.focus();
                }, 150);
            }
            return willShow;
        });
    };

    const handleBlur = (e) => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            if (
                document.activeElement !== searchInputRef.current
            ) {
                setShowSearchBar(false);
            }
        }, 120);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchAction();
        }
        if (e.key === "Escape") {
            setShowSearchBar(false);
        }
    };

    const handleSearchAction = () => {
        if (showSearchBar && searchText.trim() !== "") {
            alert(`You searched for: ${searchText}`);
            setShowSearchBar(false);
            setSearchText("");
        }
    };

    const profileDropdownStyle = {
        position: "absolute",
        top: "calc(100% + 5px)", // Keep this for better positioning
        right: "0",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        border: "1px solid #e9ecef",
        minWidth: "200px",
        zIndex: 1000,
        padding: "12px 0",
        fontFamily: "momo trust display", // Add this
        display: "flex",
        flexDirection: "column",
        // Keep animation-related styles
        opacity: showProfileDropdown ? 1 : 0,
        transform: showProfileDropdown ? "translateY(0)" : "translateY(-10px)",
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
        pointerEvents: showProfileDropdown ? "auto" : "none",
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                height: "100dvh",
                overflowY: "auto",
                backgroundColor: "#000",
                position: "relative", // for stacking context for footer
                display: "flex",
                flexDirection: "column"
            }}
        >
            {/* Fixed header similar to Login page header */}
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "60px",
                    background: "#FFFFFF", // White background
                    boxShadow: "0 3px 14px 0 rgba(143,148,251,0.10)",
                    zIndex: 1201,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: "32px",
                    paddingRight: "32px",
                    fontFamily: "momo trust display", // ensure all header text uses this font
                }}
            >
                {/* Left Side: logo and Barter Portal */}
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={LOGO_URL}
                        alt="Barter Portal Logo"
                        style={{
                            height: "46px",
                            width: "46px",
                            objectFit: "contain",
                            marginRight: "17px",
                            borderRadius: "12px",
                            boxShadow: "0 3px 12px rgba(143,148,251,0.10)"
                        }}
                    />
                    <span
                        style={{
                            fontWeight: "bold",
                            fontSize: "2.5rem",
                            color: "#184872",
                            letterSpacing: "0.02em",
                            fontFamily: "momo trust display", // <-- updated here
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
                        gap: "22px",
                        fontFamily: "momo trust display", // propagate to search bar and buttons
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", position: "relative", fontFamily: "momo trust display" }}>
                        {/* Animated search bar and button are adjacent */}
                        {/* Show search input and button when expanded, otherwise icon button */}
                        {showSearchBar ? (
                            <>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    aria-label="Search"
                                    placeholder="Type to search..."
                                    style={searchBarTransitionStyle}
                                    onBlur={handleBlur}
                                    onKeyDown={handleSearchKeyDown}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <button
                                    style={searchButtonStyle}
                                    aria-label="Search"
                                    onClick={handleSearchAction}
                                    tabIndex={0}
                                    type="button"
                                >
                                    Search
                                </button>
                            </>
                        ) : (
                            <button
                                style={searchIconButtonStyle}
                                aria-label="Show Search"
                                onClick={handleSearchClick}
                                tabIndex={0}
                            >
                                <SearchIcon />
                            </button>
                        )}
                    </div>

                    {/* Cart button */}
                            <button
                                style={{
                                    width: "50px",
                            height: "36px",
                            borderRadius: "8px",
                                    background: "#667eea",
                                    border: "none",
                                    cursor: "pointer",
                            boxShadow: "0px 3px 8px rgba(40,116,240,0.28)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.3s ease",
                                    fontFamily: "momo trust display"
                                }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "#667eea";
                        }}
                        onClick={() => navigate("/cart")}
                        aria-label="Shopping Cart"
                        title="Go to Cart"
                            >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ color: "white" }}
                        >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39c.12.63.71 1.11 1.35 1.11h11.66c.63 0 1.21-.48 1.35-1.11L23 6H6"></path>
                                </svg>
                            </button>

                    {/* Profile dropdown or Sign Up/Login buttons */}
                    {!isAuthenticated ? (
                                <div
                            onMouseEnter={() => setShowProfileDropdown(true)}
                            onMouseLeave={() => {
                                // Only hide if not hovering over dropdown
                                setTimeout(() => {
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
                                onMouseEnter={(e) => {
                                    e.target.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                                    e.target.style.color = "white";
                                    const svgs = e.target.querySelectorAll('svg');
                                    svgs.forEach(svg => svg.style.color = "white");
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = "#667eea";
                                    e.target.style.color = "white";
                                    const svgs = e.target.querySelectorAll('svg');
                                    svgs.forEach(svg => svg.style.color = "white");
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
                                        ...profileDropdownStyle,
                                        right: "-20px", // Adjust position as needed
                                        minWidth: "240px",
                                        padding: "0", // Remove padding to allow custom item padding
                                                }}
                                    onMouseEnter={() => {
                                        setIsHoveringDropdown(true);
                                        setShowProfileDropdown(true);
                                    }}
                                    onMouseLeave={() => {
                                        setIsHoveringDropdown(false);
                                        // Hide menu after a short delay to allow mouse to move
                                        setTimeout(() => {
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
                                    {/* Profile menu items */}
                                    {menuItems.map((item, index) => (
                                        <button
                                            key={index}
                                            style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "12px 20px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "#333", transition: "all 0.2s ease" }}
                                                onMouseEnter={(e) => e.target.style.background = "#f8f9fa"}
                                                onMouseLeave={(e) => e.target.style.background = "transparent"}
                                            onClick={() => {
                                                if (item.text === "My Profile") {
                                                    if (isAuthenticated) {
                                                        navigate("/myprofile");
                                                    } else {
                                                        setShowLoginFormPopup(true);
                                                    }
                                                } else {
                                                    alert(`Clicked ${item.text}`); // Placeholder for other menu items
                                                }
                                            }}
                                            >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: item.icon }} />
                                            {item.text}
                                            </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        // Authenticated user - show profile dropdown
                        <div style={{ position: "relative" }} ref={profileDropdownRef}>
                                            <button
                                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    background: "#667eea",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 2px 6px rgba(102,126,234,0.2)",
                                    transition: "all 0.3s ease",
                                    fontFamily: "momo trust display"
                                }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setShowProfileDropdown(!showProfileDropdown);
                                }}
                                title="Profile Menu"
                                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                            </button>

                            {/* Profile dropdown menu */}
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
                                    {isAuthenticated ? (
                                        // Authenticated user menu
                                        <>
                                            <div style={{ padding: "0" }}>
                                                {menuItems.map((item, index) => (
                                                    <button
                                                        key={index}
                                                        style={{ width: "100%", padding: "12px 20px", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "#333", transition: "all 0.2s ease", fontFamily: "momo trust display", display: "flex", alignItems: "center", gap: "10px" }}
                                                onMouseEnter={(e) => e.target.style.background = "#f8f9fa"}
                                                onMouseLeave={(e) => e.target.style.background = "transparent"}
                                                        onClick={() => {
                                                            setShowProfileDropdown(false);
                                                            if (item.text === "My Profile") {
                                                                if (isAuthenticated) {
                                                                    navigate("/commyprofile");
                                                                } else {
                                                                    setShowLoginFormPopup(true);
                                                                }
                                                            } else {
                                                                alert(`Clicked ${item.text}`); // Placeholder for other menu items
                                                            }
                                                        }}
                                            >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: item.icon }} />
                                                        {item.text}
                                            </button>
                                                ))}
                                            </div>
                                            <button
                                                style={{
                                                    width: "100%",
                                                    padding: "12px 20px",
                                                    background: "#dc3545", // Red background
                                                    color: "white",
                                                    border: "none",
                                                    textAlign: "left",
                                                    cursor: "pointer",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    fontFamily: "momo trust display",
                                                    transition: "all 0.2s ease",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    marginTop: "8px", // Add some spacing
                                                    borderRadius: "6px", // Added rounded edges
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = "#c82333"}
                                                onMouseLeave={(e) => e.target.style.background = "#dc3545"}
                                                onClick={() => setShowSignOutConfirm(true)}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                    <polyline points="16 17 21 12 16 7"></polyline>
                                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                                </svg>
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        // Unauthenticated user - show login prompt
                                        <div style={{ padding: "20px", textAlign: "center" }}>
                                            <div style={{ fontSize: "24px", marginBottom: "10px" }}>🔒</div>
                                            <div style={{
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                color: "#333",
                                                marginBottom: "15px",
                                                fontFamily: "momo trust display"
                                            }}>
                                                Login Required
                                            </div>
                                            <div style={{
                                                fontSize: "14px",
                                                color: "#666",
                                                marginBottom: "20px",
                                                fontFamily: "momo trust display"
                                            }}>
                                                Please log in to access your profile and account features.
                                            </div>
                                            <button
                                                style={{
                                                    padding: "10px 20px",
                                                    background: "#667eea",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    fontFamily: "momo trust display",
                                                    transition: "all 0.3s ease"
                                                }}
                                                onMouseEnter={(e) => e.target.style.background = "#5a67d8"}
                                                onMouseLeave={(e) => e.target.style.background = "#667eea"}
                                                onClick={() => navigate("/")}
                                            >
                                                Go to Login
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>
            {/* Main content area with footer attached */}
            <div style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 60px)" // Account for header
            }}>
                {/* Content section */}
                <div className="buy-outer-container" style={{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "0", // Allow shrinking
                    padding: "80px 20px 0 20px" // Account for fixed header, no bottom padding
                }}>
                <div className="buy-container" style={{
                    maxWidth: "400px",
                    width: "100%",
                    marginTop: "75px",
                    padding: "38px 30px 35px 30px",
                    background: "rgba(255, 255, 255, 0.97)",
                    borderRadius: "15px",
                    boxShadow: "0 8px 32px rgba(143, 148, 251, 0.13)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <h2 style={{
                        textAlign: "center",
                        marginBottom: "21px",
                        color: "#184872",
                        fontSize: "2em",
                        fontWeight: 600
                    }}>
                        Welcome to Buy Section!
                    </h2>
                    <p style={{ color: "#4e5688", fontSize: "1.10em", textAlign: "center", marginBottom: "10px" }}>
                        Browse and purchase items from our marketplace.
                    </p>
                    <div style={{
                        marginTop: "20px",
                        marginBottom: "0",
                        width: "100%",
                        textAlign: "center"
                    }}>
                    </div>
                </div>
                </div>

                {/* Footer attached directly to content */}
                <footer
                    style={{
                      background: "#111",
                      color: "#fff",
                      width: "100%",
                      padding: "30px 0 18px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontFamily: "'Segoe UI', Arial, sans-serif",
                      fontSize: "1rem"
                    }}
                >
                  <div style={{ marginBottom: 12 }}>
                    <SocialIcon type="twitter" url="https://twitter.com/" />
                    <SocialIcon type="facebook" url="https://facebook.com/" />
                    <SocialIcon type="instagram" url="https://instagram.com/" />
                    <SocialIcon type="linkedin" url="https://www.linkedin.com/in/sujan-g-j-821382318/" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", opacity: 0.85 }}>
                    <span
                      style={{
                        marginRight: 7,
                        verticalAlign: "middle",
                        fontSize: "1em",
                        userSelect: "none",
                      }}
                      aria-label="Copyright"
                      role="img"
                      // usage of Unicode © character
                    >
                      &copy;
                    </span>
                    2025 Barterportal.com
                  </div>
                </footer>
            </div>

            {/* Sign Out Confirmation Popup */}
            {showSignOutConfirm && (
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
                        <div style={{
                            fontSize: "48px",
                            marginBottom: "20px",
                            color: "#f39c12"
                        }}>
                            
                        </div>

                        <h3 style={{
                            margin: "0 0 15px 0",
                            color: "#333",
                            fontSize: "20px",
                            fontWeight: "600"
                        }}>
                            Confirm Sign Out
                        </h3>

                        <p style={{
                            margin: "0 0 25px 0",
                            color: "#666",
                            fontSize: "16px",
                            lineHeight: "1.5"
                        }}>
                            Are you sure you want to sign out?
                        </p>

                        <div style={{
                            display: "flex",
                            gap: "15px",
                            justifyContent: "center"
                        }}>
                            <button
                                style={{
                                    padding: "12px 24px",
                                    background: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    fontFamily: "momo trust display",
                                    transition: "all 0.3s ease"
                                }}
                                onMouseEnter={(e) => e.target.style.background = "#c82333"}
                                onMouseLeave={(e) => e.target.style.background = "#dc3545"}
                                onClick={() => {
                                    setShowSignOutConfirm(false);
                                    // Clear user session comprehensively
                                    localStorage.setItem("isAuthenticated", "false");
                                    localStorage.removeItem("userAddresses");
                                    localStorage.removeItem("userName");
                                    localStorage.removeItem("userEmail");
                                    localStorage.removeItem("userPhone");
                                    // Navigate to Home and reload
                                    window.location.href = "/";
                                }}
                            >
                                Leave
                            </button>

                            <button
                                style={{
                                    padding: "12px 24px",
                                    background: "#6c757d",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    fontFamily: "momo trust display",
                                    transition: "all 0.3s ease"
                                }}
                                onMouseEnter={(e) => e.target.style.background = "#5a6268"}
                                onMouseLeave={(e) => e.target.style.background = "#6c757d"}
                                onClick={() => setShowSignOutConfirm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sign Up Prompt Popup for Unauthenticated Users */}
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
                        {/* Cancel Icon */}
                        <button
                            onClick={() => setShowSignUpPrompt(false)}
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                background: "none",
                                border: "none",
                                fontSize: "24px",
                                cursor: "pointer",
                                color: "#666",
                                padding: "5px",
                                borderRadius: "50%",
                                transition: "all 0.3s ease"
                            }}
                            onMouseEnter={(e) => e.target.style.background = "#f0f0f0"}
                            onMouseLeave={(e) => e.target.style.background = "transparent"}
                            title="Close"
                        >
                            ×
                        </button>

                        <div style={{
                            fontSize: "48px",
                            marginBottom: "20px",
                            color: "#667eea"
                        }}>
                            🚀
                        </div>

                        <h3 style={{
                            margin: "0 0 15px 0",
                            color: "#333",
                            fontSize: "24px",
                            fontWeight: "600"
                        }}>
                            Join Barter Portal!
                        </h3>

                        <p style={{
                            margin: "0 0 25px 0",
                            color: "#666",
                            fontSize: "16px",
                            lineHeight: "1.6"
                        }}>
                            Create an account to unlock all features including personalized recommendations,
                            order tracking, wishlist management, and exclusive rewards!
                        </p>

                        <div style={{
                            display: "flex",
                            gap: "15px",
                            justifyContent: "center",
                            flexWrap: "wrap"
                        }}>
                            <button
                                style={{
                                    padding: "14px 28px",
                                    background: "#667eea",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    fontFamily: "momo trust display",
                                    transition: "all 0.3s ease",
                                    minWidth: "140px"
                                }}
                                onMouseEnter={(e) => e.target.style.background = "#5a67d8"}
                                onMouseLeave={(e) => e.target.style.background = "#667eea"}
                                onClick={() => {
                                    setShowSignUpPrompt(false); // Close the prompt
                                    setShowFullSignUpPopup(true); // Open the full signup popup
                                }}
                            >
                                Sign Up Now
                            </button>

                            <button
                                style={{
                                    padding: "14px 28px",
                                    background: "#f8f9fa",
                                    color: "#666",
                                    border: "2px solid #e9ecef",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    fontFamily: "momo trust display",
                                    transition: "all 0.3s ease",
                                    minWidth: "140px"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = "#e9ecef";
                                    e.target.style.color = "#333";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = "#f8f9fa";
                                    e.target.style.color = "#666";
                                }}
                                onClick={() => setShowSignUpPrompt(false)}
                            >
                                Continue Browsing
                            </button>
                        </div>

                        <p style={{
                            margin: "20px 0 0 0",
                            color: "#999",
                            fontSize: "14px",
                            fontStyle: "italic"
                        }}>
                            
                        </p>
                    </div>
                </div>
            )}

            {showFullSignUpPopup && (
                <SignUpFormPopup
                    onClose={() => setShowFullSignUpPopup(false)}
                    onSignUpSuccess={() => {
                        localStorage.setItem("isAuthenticated", "true"); // Assume successful signup means authenticated
                        setIsAuthenticated(true); // Update local state
                        navigate("/buy"); // Redirect to buy after signup
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
                        navigate("/buy"); // Redirect to buy after login
                        setShowLoginFormPopup(false);
                    }}
                />
            )}
        </div>
    );
}

export default Buy;
