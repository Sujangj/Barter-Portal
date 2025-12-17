import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormPopup from "./LoginFormPopup";
import SignUpFormPopup from "./SignUpFormPopup";

const LOGO_URL =
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRcsGEl_k_ju03oX1HX_A9lK-VvqKCm0WVdABkw4Y3k6uvo4zw45lzrgevt2B4CDWJNAOpAV8D8";

const LOGIN_HEADER_BG = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

function Header({ showBackButton, backButtonColor }) {
    const navigate = useNavigate();
    const [showLoginFormPopup, setShowLoginFormPopup] = useState(false);
    const [showFullSignUpPopup, setShowFullSignUpPopup] = useState(false);
    const [headerLoginPressed, setHeaderLoginPressed] = useState(false);

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

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
                ) : (
                    // Placeholder for authenticated user dropdown/buttons
                    <React.Fragment>
                        {showBackButton ? (
                                <button
                                    style={{
                                        ...headerButtonStyle,
                                        background: backButtonColor || LOGIN_HEADER_BG,
                                    }}
                                    onClick={() => navigate("/home")}
                                >
                                    Back to Home
                                </button>
                        ) : (
                            <button
                                style={{
                                    ...headerButtonStyle,
                                }}
                                onClick={() => navigate("/profile")}
                            >
                                Profile
                            </button>
                        )}
                    </React.Fragment>
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

