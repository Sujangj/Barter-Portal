import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Login.css";

const BOOKS_BG =
  "https://images.unsplash.com/photo-1610209455607-89e8b3e0e393?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVycGxlJTIwZ2FsYXh5fGVufDB8fDB8fHww";

// Extracted the CenteredInfoCard as a separate component to resolve hooks error inside .map
function CenteredInfoCard({ text, onClick }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const LOGIN_HEADER_BG = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  return (
    <div
      style={{
        color: "black",
        fontWeight: "bold",
        fontFamily: "momo trust display",
        fontSize: "2.5em",
        textAlign: "center",
        padding: "50px 0",
        background: LOGIN_HEADER_BG, // Same gradient as login button
        borderRadius: "8px", // Match button border radius
        boxShadow: "0px 3px 8px rgba(140,148,251,0.09)", // Match button shadow
        minWidth: 320,
        minHeight: "100px",
        margin: "0 18px",
        userSelect: "none",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)", // Match button transition
        willChange: "transform", // Match button will-change
        cursor: onClick ? "pointer" : "default", // Clickable if onClick provided
        textTransform: "none", // Match button text transform
        transform: pressed ? "scale(0.96) translateY(1.5px)" : hovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

function Login() {
    // State for showing popup cards
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false); // Restored state
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [currentPlaceholder, setCurrentPlaceholder] = useState(null);

    // Login state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // Sign out confirmation state
    const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

    // SignUp state - with additional fields
    const [signupName, setSignupName] = useState(""); // Restored state
    const [signupPhone, setSignupPhone] = useState(""); // Restored state
    const [signupEmail, setSignupEmail] = useState(""); // Restored state
    const [signupPassword, setSignupPassword] = useState(""); // Restored state
    const [signupError, setSignupError] = useState(""); // Restored state
    const [signupSuccess, setSignupSuccess] = useState(""); // Restored state

    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            setLoginError("Please fill in all fields");
            return;
        }
        setLoginError("");
        // In a real app, you would authenticate here
        console.log("Login attempt:", { loginEmail, loginPassword });
        setShowLogin(false);
        // Set authenticated state
        localStorage.setItem("isAuthenticated", "true");

        // Redirect to the page the user was trying to access
        const route = currentPlaceholder === "Buy" ? "/buy" :
                     currentPlaceholder === "Exchange" ? "/home" :
                     currentPlaceholder === "Sell" ? "/sell" : "/home";
        navigate(route);
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (!signupName || !signupPhone || !signupEmail || !signupPassword) {
            setSignupError("Please fill in all fields");
            setSignupSuccess("");
            return;
        }
        // In a real app, you would send the sign-up data to the server
        setSignupError("");
        setSignupSuccess("Account created! Please log in.");
        setSignupName("");
        setSignupPhone("");
        setSignupEmail("");
        setSignupPassword("");
        // Optionally close signup and open login after delay
        setTimeout(() => {
            setShowSignUp(false);
            setShowLogin(true);
        }, 1200);
    };

    const handleClose = () => {
        setShowLogin(false);
        setShowSignUp(false); // Restored to close inline signup
        setShowAuthPopup(false);
        setCurrentPlaceholder(null);
        setLoginEmail("");
        setLoginPassword("");
        setLoginError("");
        setSignupName(""); // Reset signup form fields
        setSignupPhone(""); // Reset signup form fields
        setSignupEmail(""); // Reset signup form fields
        setSignupPassword(""); // Reset signup form fields
        setSignupError(""); // Reset signup error
        setSignupSuccess(""); // Reset signup success
    };

    // Popup button style for both Login and Sign Up
    const popupButtonStyle = {
        padding: "12px 28px",
        fontWeight: "bold",
        fontSize: "16px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        width: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        willChange: "transform"
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                height: "100dvh",
                overflowY: "auto",
                backgroundImage: `url('${BOOKS_BG}')`,
                backgroundColor: "#fff",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                position: "relative", // for stacking context for footer
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Header showSignOutButton={true} onSignOut={() => setShowSignOutConfirm(true)} />
            {/* Main content area with footer attached */}
            <div style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 60px)" // Account for header
            }}>
                {/* Content section */}
                <div
                    style={{
                        flex: "1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: "60px",
                        paddingBottom: "0" // No bottom padding
                    }}
                >
                {/* Multiple centered content placeholders */}
                {[
                    { text: "Buy", onClick: () => { setCurrentPlaceholder("Buy"); setShowAuthPopup(true); }, route: "/buy" },
                    { text: "Exchange", onClick: () => { setCurrentPlaceholder("Exchange"); setShowAuthPopup(true); }, route: "/home" },
                    { text: "Sell", onClick: () => { setCurrentPlaceholder("Sell"); setShowAuthPopup(true); }, route: "/sell" }
                ].map((item, idx) => (
                    <CenteredInfoCard text={item.text} onClick={item.onClick} key={idx} />
                ))}
            </div>
            {/* Login Popup Card */}
            {showLogin && (
                <div className="popup-overlay" style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1300,
                    overflowY: "auto"
                }}>
                    <div style={{
                        background: "#fff",
                        borderRadius: "13px",
                        minWidth: "340px",
                        minHeight: "340px",
                        boxShadow: "0 12px 30px rgba(143,148,251,0.12)",
                        position: "relative",
                        padding: "36px 32px 32px 32px",
                        maxHeight: "calc(100vh - 40px)",
                        overflow: "auto"
                    }}>
                        <button
                            aria-label="Close"
                            onClick={handleClose}
                            style={{
                                position: "absolute",
                                top: 13,
                                right: 18,
                                border: "none",
                                background: "transparent",
                                fontSize: "22px",
                                cursor: "pointer",
                                color: "#999"
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 20 20"><line x1="5" y1="5" x2="15" y2="15" stroke="#888" strokeWidth="2" /><line x1="15" y1="5" x2="5" y2="15" stroke="#888" strokeWidth="2" /></svg>
                        </button>
                        <h2 style={{ marginBottom: "18px", textAlign: "center" }}>Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="login-field" style={{ marginBottom: "21px" }}>
                                <label htmlFor="loginEmail" className="login-label" style={{ display: "block", marginBottom: 5 }}>
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="loginEmail"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    className="login-input"
                                    placeholder="Enter your email"
                                    autoComplete="username"
                                />
                            </div>

                            <div className="login-field" style={{ marginBottom: "21px" }}>
                                <label htmlFor="loginPassword" className="login-label" style={{ display: "block", marginBottom: 5 }}>
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="loginPassword"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    className="login-input"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />
                            </div>

                            {loginError && (
                                <div className="login-error" style={{ marginBottom: "16px" }}>
                                    {loginError}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="login-button"
                                style={popupButtonStyle}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Sign Up Popup Card */}
            {showSignUp && (
                <div className="popup-overlay" style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1300,
                    overflowY: "auto"
                }}>
                    <div className="signup-container" style={{
                        background: "#fff",
                        borderRadius: "13px",
                        minWidth: "340px",
                        minHeight: "380px",
                        boxShadow: "0 12px 30px rgba(143,148,251,0.12)",
                        position: "relative",
                        padding: "36px 32px 32px 32px",
                        maxHeight: "calc(100vh - 40px)",
                        overflow: "auto"
                    }}>
                        <button
                            aria-label="Close"
                            onClick={handleClose}
                            style={{
                                position: "absolute",
                                top: 13,
                                right: 18,
                                border: "none",
                                background: "transparent",
                                fontSize: "22px",
                                cursor: "pointer",
                                color: "#999"
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 20 20"><line x1="5" y1="5" x2="15" y2="15" stroke="#888" strokeWidth="2" /><line x1="15" y1="5" x2="5" y2="15" stroke="#888" strokeWidth="2" /></svg>
                        </button>
                        <h2 style={{ marginBottom: "18px", textAlign: "center" }}>Sign Up</h2>
                        <form onSubmit={handleSignUpSubmit}>
                            <div className="login-field" style={{ marginBottom: "21px" }}>
                                <label htmlFor="signupName" className="login-label" style={{ display: "block", marginBottom: 5 }}>
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="signupName"
                                    value={signupName}
                                    onChange={(e) => setSignupName(e.target.value)}
                                    className="login-input"
                                    placeholder="Enter your name"
                                    autoComplete="name"
                                />
                            </div>

                            <div className="login-field" style={{ marginBottom: "21px" }}>
                                <label htmlFor="signupPhone" className="login-label" style={{ display: "block", marginBottom: 5 }}>
                                    Phone:
                                </label>
                                <input
                                    type="tel"
                                    id="signupPhone"
                                    value={signupPhone}
                                    onChange={(e) => setSignupPhone(e.target.value)}
                                    className="login-input"
                                    placeholder="Enter your phone"
                                    autoComplete="tel"
                                />
                            </div>

                            <div className="login-field" style={{ marginBottom: "21px" }}>
                                <label htmlFor="signupEmail" className="login-label" style={{ display: "block", marginBottom: 5 }}>
                                    Email ID:
                                </label>
                                <input
                                    type="email"
                                    id="signupEmail"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    className="login-input"
                                    placeholder="Enter your email"
                                    autoComplete="username"
                                />
                            </div>
                            <div className="login-field" style={{ marginBottom: "21px" }}>
                                <label htmlFor="signupPassword" className="login-label" style={{ display: "block", marginBottom: 5 }}>
                                    Create password:
                                </label>
                                <input
                                    type="password"
                                    id="signupPassword"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    className="login-input"
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                />
                            </div>

                            {signupError && (
                                <div className="login-error" style={{ marginBottom: "12px" }}>
                                    {signupError}
                                </div>
                            )}
                            {signupSuccess && (
                                <div style={{ color: "#52bb5b", marginBottom: 12, textAlign: "center" }}>
                                    {signupSuccess}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="login-button"
                                style={popupButtonStyle}
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* SignUpFormPopup - used when 'Sign Up' button is clicked directly */}
            {/* {showSignUpForm && (
                <SignUpFormPopup
                    onClose={() => setShowSignUpForm(false)}
                    onSignUpSuccess={() => {
                        setShowLogin(true); // Show login form after successful signup
                        localStorage.setItem("isAuthenticated", "true"); // Assume successful signup means authenticated
                    }}
                />
            )} */}

            {/* Authentication Options Popup */}
            {showAuthPopup && (
                <div className="popup-overlay" style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1300,
                    overflowY: "auto"
                }}>
                    <div style={{
                        background: "#fff",
                        borderRadius: "13px",
                        minWidth: "340px",
                        minHeight: "200px",
                        boxShadow: "0 12px 30px rgba(143,148,251,0.12)",
                        position: "relative",
                        padding: "36px 32px 32px 32px",
                        maxHeight: "calc(100vh - 40px)",
                        overflow: "auto"
                    }}>
                        <button
                            aria-label="Close"
                            onClick={() => setShowAuthPopup(false)}
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                border: "none",
                                background: "transparent",
                                fontSize: "22px",
                                cursor: "pointer",
                                color: "#999"
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 20 20"><line x1="5" y1="5" x2="15" y2="15" stroke="#888" strokeWidth="2" /><line x1="15" y1="5" x2="5" y2="15" stroke="#888" strokeWidth="2" /></svg>
                        </button>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", justifyContent: "center", minHeight: "120px" }}>
                            <button
                                onClick={() => {
                                    setShowAuthPopup(false);
                                    setShowLogin(true);
                                }}
                                style={{
                                    padding: "14px 32px",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "9999px",
                                    cursor: "pointer",
                                    minWidth: "220px",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
                                    willChange: "transform"
                                }}
                            >
                                Login or Signup
                            </button>
                            <button
                                onClick={() => {
                                    setShowAuthPopup(false);
                                    // Set unauthenticated state
                                    localStorage.setItem("isAuthenticated", "false");
                                    const route = currentPlaceholder === "Buy" ? "/buy" :
                                                 currentPlaceholder === "Exchange" ? "/home" :
                                                 currentPlaceholder === "Sell" ? "/sell" : "/home";
                                    navigate(route);
                                }}
                                style={{
                                    padding: "10px 24px",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    background: "#f8f9fa",
                                    color: "#333",
                                    border: "2px solid #e9ecef",
                                    borderRadius: "9999px",
                                    cursor: "pointer",
                                    minWidth: "180px",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
                                    willChange: "transform"
                                }}
                            >
                                Continue without Login
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                    // Clear authentication state
                                    localStorage.setItem("isAuthenticated", "false");
                                    navigate("/");
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
            </div>
            <Footer />
        </div>
    );
}

export default Login;
