import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const PROFILE_BG =
  "https://images.unsplash.com/photo-1610209455607-89e8b3e0e393?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVycGxlJTIwZ2FsYXh5fGVufDB8fDB8fHww";

function MyProfile() {
  const navigate = useNavigate();
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("user@example.com");
  const [mobile, setMobile] = useState("+91 9876543210");

  useEffect(() => {
    // Check if user came from Buy page, Home page, or Sell page
    const referrer = document.referrer;
    const currentUrl = window.location.href;
    const isFromAllowedPage = referrer.includes('/buy') || referrer.includes('buy') ||
                             referrer.includes('/home') || referrer.includes('home') ||
                             referrer.includes('/sell') || referrer.includes('sell');

    // If not from Buy, Home, or Sell page and not a direct navigation, redirect to home
    if (!isFromAllowedPage && referrer !== '' && !currentUrl.includes('#')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSave = () => {
    // Here you would typically save to backend
    alert("Profile updated successfully!");
  };

  const handleDeactivate = () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      // Handle deactivation
      alert("Account deactivation requested. Our team will contact you soon.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      // Handle deletion
      alert("Account deletion requested. Our team will contact you soon.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100dvh",
        overflowY: "auto",
        backgroundImage: `url('${PROFILE_BG}')`,
        backgroundColor: "#f5f5f5",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header />
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 60px)",
          paddingTop: "60px"
        }}
      >
        <main
          style={{
            flex: "1",
            display: "flex",
            minHeight: "calc(100vh - 60px)",
            paddingTop: "60px"
          }}
        >
          {/* Left Sidebar */}
          <div
            style={{
              width: "300px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRight: "1px solid #e9ecef",
              borderRadius: "0 15px 15px 0",
              padding: "30px 20px",
              boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#184872",
              marginBottom: "30px",
              fontFamily: "momo trust display",
              textAlign: "center"
            }}>
              👤 Profile Menu
            </h2>

            {/* Profile Information Button */}
            <div
              style={{
                background: showPersonalInfo ? "rgba(102, 126, 234, 0.2)" : "rgba(102, 126, 234, 0.1)",
                border: showPersonalInfo ? "2px solid #667eea" : "2px solid transparent",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "center"
              }}
              onMouseEnter={(e) => {
                if (!showPersonalInfo) {
                  e.target.style.background = "rgba(102, 126, 234, 0.15)";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!showPersonalInfo) {
                  e.target.style.background = "rgba(102, 126, 234, 0.1)";
                  e.target.style.transform = "translateY(0)";
                }
              }}
              onClick={() => setShowPersonalInfo(!showPersonalInfo)}
            >
              <h3 style={{
                fontSize: "1.2rem",
                color: "#667eea",
                marginBottom: "8px",
                fontFamily: "momo trust display",
                fontWeight: "bold"
              }}>
                Personal Information
              </h3>
              <p style={{
                color: "#666",
                fontSize: "0.9rem",
                fontFamily: "momo trust display",
                margin: "0"
              }}>
                {showPersonalInfo ? "Click to hide details" : "Click to view and edit"}
              </p>
              <div style={{
                marginTop: "10px",
                fontSize: "1.2rem",
                color: "#667eea",
                transition: "transform 0.3s ease"
              }}>
                {showPersonalInfo ? "−" : "+"}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "40px",
              overflowY: "auto"
            }}
          >
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#184872",
              marginBottom: "40px",
              fontFamily: "momo trust display",
              textAlign: "center"
            }}>
            
            </h1>

            {/* Personal Information Form */}
            {showPersonalInfo && (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "12px",
                  padding: "30px",
                  marginBottom: "30px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  maxWidth: "800px"
                }}
              >
                <h3 style={{
                  color: "#184872",
                  marginBottom: "25px",
                  fontFamily: "momo trust display",
                  textAlign: "center",
                  fontSize: "1.5rem"
                }}>
                  Edit Personal Information
                </h3>

                {/* Gender */}
                <div style={{ marginBottom: "25px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "12px",
                    fontWeight: "bold",
                    color: "#333",
                    fontFamily: "momo trust display",
                    fontSize: "1.1rem"
                  }}>
                    Gender:
                  </label>
                  <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
                    <label style={{ display: "flex", alignItems: "center", fontFamily: "momo trust display", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                        style={{ marginRight: "8px", cursor: "pointer" }}
                      />
                      Male
                    </label>
                    <label style={{ display: "flex", alignItems: "center", fontFamily: "momo trust display", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                        style={{ marginRight: "8px", cursor: "pointer" }}
                      />
                      Female
                    </label>
                    <label style={{ display: "flex", alignItems: "center", fontFamily: "momo trust display", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={gender === "other"}
                        onChange={(e) => setGender(e.target.value)}
                        style={{ marginRight: "8px", cursor: "pointer" }}
                      />
                      Other
                    </label>
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: "25px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                    fontFamily: "momo trust display",
                    fontSize: "1.1rem"
                  }}>
                    Email Address:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontFamily: "momo trust display",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                {/* Mobile */}
                <div style={{ marginBottom: "30px" }}>
                  <label style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#333",
                    fontFamily: "momo trust display",
                    fontSize: "1.1rem"
                  }}>
                    Mobile Number:
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontFamily: "momo trust display",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={handleSave}
                    style={{
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      padding: "12px 30px",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontFamily: "momo trust display",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#218838";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#28a745";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* FAQs Section */}
            {showPersonalInfo && (
              <div style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "12px",
                padding: "30px",
                marginBottom: "30px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "800px"
              }}>
                <h3 style={{
                  color: "#184872",
                  marginBottom: "25px",
                  fontFamily: "momo trust display",
                  textAlign: "center",
                  fontSize: "1.5rem"
                }}>
                  Frequently Asked Questions
                </h3>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{
                    color: "#333",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "momo trust display"
                  }}>
                    What happens when I update my email address (or mobile number)?
                  </h4>
                  <p style={{
                    color: "#666",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    fontFamily: "momo trust display",
                    margin: "0"
                  }}>
                    Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).
                  </p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{
                    color: "#333",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "momo trust display"
                  }}>
                    When will my Barter Portal account be updated with the new email address (or mobile number)?
                  </h4>
                  <p style={{
                    color: "#666",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    fontFamily: "momo trust display",
                    margin: "0"
                  }}>
                    It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.
                  </p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{
                    color: "#333",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "momo trust display"
                  }}>
                    What happens to my existing account when I update my email address (or mobile number)?
                  </h4>
                  <p style={{
                    color: "#666",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    fontFamily: "momo trust display",
                    margin: "0"
                  }}>
                    Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.
                  </p>
                </div>

                <div>
                  <h4 style={{
                    color: "#333",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontFamily: "momo trust display"
                  }}>
                    Does my Seller account get affected when I update my email address?
                  </h4>
                  <p style={{
                    color: "#666",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    fontFamily: "momo trust display",
                    margin: "0"
                  }}>
                    Barter Portal has a 'single sign-on' policy. Any changes will reflect in your Seller account also.
                  </p>
                </div>
              </div>
            )}

            {/* Account Action Buttons */}
            {showPersonalInfo && (
              <div style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "12px",
                padding: "30px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "800px",
                textAlign: "center"
              }}>
                <h3 style={{
                  color: "#184872",
                  marginBottom: "25px",
                  fontFamily: "momo trust display",
                  fontSize: "1.3rem"
                }}>
                  Account Management
                </h3>

                <div style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}>
                  <button
                    onClick={handleDeactivate}
                    style={{
                      background: "#ffc107",
                      color: "#212529",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(255, 193, 7, 0.3)",
                      fontFamily: "momo trust display",
                      transition: "all 0.3s ease",
                      minWidth: "180px"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#e0a800";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 16px rgba(255, 193, 7, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#ffc107";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 12px rgba(255, 193, 7, 0.3)";
                    }}
                  >
                    Deactivate Account
                  </button>

                  <button
                    onClick={handleDelete}
                    style={{
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)",
                      fontFamily: "momo trust display",
                      transition: "all 0.3s ease",
                      minWidth: "180px"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#c82333";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 16px rgba(220, 53, 69, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#dc3545";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 12px rgba(220, 53, 69, 0.3)";
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Empty State Message */}
            {!showPersonalInfo && (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "12px",
                  padding: "60px 40px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "600px"
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>👤</div>
                <h3 style={{
                  color: "#184872",
                  marginBottom: "15px",
                  fontFamily: "momo trust display",
                  fontSize: "1.5rem"
                }}>
                  Welcome to Your Profile
                </h3>
                <p style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  fontFamily: "momo trust display",
                  lineHeight: "1.6"
                }}>
                  Click on "Personal Information" in the sidebar to view and manage your account settings.
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MyProfile;
