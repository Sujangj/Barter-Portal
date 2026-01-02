import React, { useState } from "react";
import { LOGIN_HEADER_BG } from "./constants";

function SignUpFormPopup({ onClose, onSignUpSuccess }) {
    const [signupName, setSignupName] = useState("");
    const [signupPhone, setSignupPhone] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupError, setSignupError] = useState("");
    const [signupSuccess, setSignupSuccess] = useState("");

    const popupButtonStyle = {
        padding: "12px 28px",
        fontWeight: "bold",
        fontSize: "16px",
        background: LOGIN_HEADER_BG,
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

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (!signupName || !signupPhone || !signupEmail || !signupPassword) {
            setSignupError("Please fill in all fields");
            setSignupSuccess("");
            return;
        }
        setSignupError("");
        setSignupSuccess("Account created!");
        setSignupName("");
        setSignupPhone("");
        setSignupEmail("");
        setSignupPassword("");

        setTimeout(() => {
            onClose(); // Close the signup popup
            onSignUpSuccess(); // Trigger login popup or redirect
        }, 1200);
    };

    return (
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
                    onClick={onClose}
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
    );
}

export default SignUpFormPopup;
