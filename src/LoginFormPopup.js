import React, { useState } from "react";
import { LOGIN_HEADER_BG, API_BASE_URL } from "./constants";

function LoginFormPopup({ onClose, onLoginSuccess }) {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

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

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            setLoginError("Please fill in all fields");
            return;
        }
        setLoginError("");
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isAuthenticated', 'true');
            }
            if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
            onLoginSuccess();
            onClose();
        } catch (err) {
            setLoginError(err.message);
        }
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
            <div className="login-container" style={{
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
    );
}

export default LoginFormPopup;
