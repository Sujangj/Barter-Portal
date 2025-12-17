import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

// Logo image url – copied from Login.js
const LOGO_URL =
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRcsGEl_k_ju03oX1HX_A9lK-VvqKCm0WVdABkw4Y3k6uvo4zw45lzrgevt2B4CDWJNAOpAV8D8";

// Contact page background image
const CONTACT_BG_URL =
  "https://images.unsplash.com/photo-1610209455607-89e8b3e0e393?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVycGxlJTIwZ2FsYXh5fGVufDB8fDB8fHww";

// Social media icons as inline SVGs (fontawesome style, but inline for no dependency)
function SocialIcon({ type, url }) {
  let icon;
  if (type === "twitter") {
    icon = (
      <svg height="24" width="24" fill="#fff" viewBox="0 0 24 24" aria-label="X (Twitter)">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  } else if (type === "facebook") {
    icon = (
      <svg height="24" width="24" fill="#fff" viewBox="0 0 24 24" aria-label="Facebook">
        <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.48v-9.294H9.692V11.01h3.114V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.314h3.587l-.467 3.696h-3.12V24h6.116c.726 0 1.326-.6 1.326-1.326V1.326C24 .6 23.4 0 22.675 0"/>
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
        <circle cx="18.406" cy="5.594" r="1.44"/>
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

// Contact page component
function Contact() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                height: "100dvh",
                overflowY: "auto",
                background: `url(${CONTACT_BG_URL}) center center / cover no-repeat fixed`,
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
                    <button
                        style={{
                            minWidth: "140px",
                            width: "140px",
                            padding: "13px 20px",
                            fontWeight: "bold",
                            fontSize: "16px",
                            borderRadius: "8px",
                            background: "red",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0px 3px 8px rgba(220,53,69,0.28)",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            whiteSpace: "nowrap",
                            transition: "all 0.3s ease",
                            fontFamily: "momo trust display", // updated font family for header button
                        }}
                        onClick={() => navigate("/home")}
                    >
                        Back to Home
                    </button>
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
                <div style={{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "80px 20px 0 20px" // Account for fixed header, no bottom padding
                }}>
                    <div style={{
                        maxWidth: "600px",
                        width: "100%",
                        padding: "40px 35px",
                        background: "rgba(255, 255, 255, 0.97)",
                        borderRadius: "15px",
                        boxShadow: "0 8px 32px rgba(143, 148, 251, 0.13)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.13)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        <h2 style={{
                            textAlign: "center",
                            marginBottom: "25px",
                            color: "#184872",
                            fontSize: "2.2em",
                            fontWeight: 600,
                            fontFamily: "momo trust display"
                        }}>
                            Contact Us
                        </h2>

                        <div style={{
                            fontSize: "1.1em",
                            lineHeight: "1.6",
                            color: "#4e5688",
                            fontFamily: "momo trust display",
                            width: "100%"
                        }}>
                            <p style={{ marginBottom: "30px" }}>
                                We'd love to hear from you! Whether you have questions, feedback, or need support,
                                our team is here to help. Reach out to us through any of the channels below.
                            </p>

                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gap: "25px",
                                marginBottom: "30px"
                            }}>
                                <div style={{
                                    background: "#f8f9fa",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    border: "1px solid #e9ecef",
                                    textAlign: "left"
                                }}>
                                    <h3 style={{
                                        color: "#184872",
                                        marginBottom: "10px",
                                        fontSize: "1.2em",
                                        fontWeight: "600",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        📧 Email Support
                                    </h3>
                                    <p style={{ margin: "0", color: "#666" }}>
                                        <strong>General Inquiries:</strong> support@barterportal.com<br/>
                                        <strong>Business Partnerships:</strong> partnerships@barterportal.com<br/>
                                        <strong>Technical Support:</strong> tech@barterportal.com
                                    </p>
                                </div>

                                <div style={{
                                    background: "#f8f9fa",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    border: "1px solid #e9ecef",
                                    textAlign: "left"
                                }}>
                                    <h3 style={{
                                        color: "#184872",
                                        marginBottom: "10px",
                                        fontSize: "1.2em",
                                        fontWeight: "600",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        📱 Phone & Live Chat
                                    </h3>
                                    <p style={{ margin: "0", color: "#666" }}>
                                        <strong>Customer Service:</strong> +1 (555) 123-4567<br/>
                                        <strong>Business Hours:</strong> Monday - Friday, 9 AM - 6 PM EST<br/>
                                        <strong>Live Chat:</strong> Available 24/7 on our website
                                    </p>
                                </div>

                                <div style={{
                                    background: "#f8f9fa",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    border: "1px solid #e9ecef",
                                    textAlign: "left"
                                }}>
                                    <h3 style={{
                                        color: "#184872",
                                        marginBottom: "10px",
                                        fontSize: "1.2em",
                                        fontWeight: "600",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        📍 Office Location
                                    </h3>
                                    <p style={{ margin: "0", color: "#666" }}>
                                        <strong>Headquarters:</strong><br/>
                                        123 Trade Street<br/>
                                        Commerce City, CC 12345<br/>
                                        United States
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                background: "#667eea",
                                color: "#fff",
                                padding: "20px",
                                borderRadius: "10px",
                                marginBottom: "40px"
                            }}>
                                <h3 style={{
                                    marginBottom: "10px",
                                    fontSize: "1.2em",
                                    fontWeight: "600"
                                }}>
                                    🚀 Quick Response Guarantee
                                </h3>
                                <p style={{ margin: "0", opacity: 0.9 }}>
                                    We respond to all inquiries within 24 hours during business days.
                                    For urgent technical issues, our team provides round-the-clock support.
                                </p>
                            </div>

                            <p style={{ marginBottom: "0", fontSize: "0.95em", color: "#888" }}>
                                Follow us on social media for the latest updates and community highlights!
                            </p>
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
        </div>
    );
}

export default Contact;
