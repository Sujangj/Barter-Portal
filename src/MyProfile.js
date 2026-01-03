import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { PROFILE_BG } from "./constants";

function MyProfile() {
  const navigate = useNavigate();
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showManageAddresses, setShowManageAddresses] = useState(false);
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("user@example.com");
  const [mobile, setMobile] = useState("+91 9876543210");

  // Addresses state
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('userAddresses');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        type: 'Home',
        name: 'John Doe',
        phone: '+91 9876543210',
        address: '123 Main Street, Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        isDefault: true
      },
      {
        id: 2,
        type: 'Work',
        name: 'John Doe',
        phone: '+91 9876543210',
        address: '456 Business Park, Office 101',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400002',
        isDefault: false
      }
    ];
  });

  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

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

  // Address management functions
  const handleAddAddress = (addressData) => {
    const newAddress = {
      ...addressData,
      id: Date.now(),
      isDefault: addresses.length === 0 // First address is default
    };
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
  };

  const handleUpdateAddress = (id, addressData) => {
    const updatedAddresses = addresses.map(addr =>
      addr.id === id ? { ...addr, ...addressData } : addr
    );
    setAddresses(updatedAddresses);
    localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedAddresses = addresses.filter(addr => addr.id !== id);
      setAddresses(updatedAddresses);
      localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
    }
  };

  const handleSetDefaultAddress = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id // Only the selected address is default
    }));
    setAddresses(updatedAddresses);
    localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
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
              Profile Menu
            </h2>

            {/* Profile Information Button */}
            <div
              style={{
                background: "#667eea",
                border: "none",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(102,126,234,0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5a67d8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#667eea";
              }}
              onClick={() => {
                setShowPersonalInfo(!showPersonalInfo);
                setShowManageAddresses(false);
              }}
            >
              <h3 style={{
                fontSize: "1.2rem",
                color: "#fff",
                marginBottom: "8px",
                fontFamily: "momo trust display",
                fontWeight: "bold",
                pointerEvents: "none"
              }}>
                Personal Information
              </h3>
            </div>

            {/* Manage Addresses Button */}
            <div
              style={{
                background: "#667eea",
                border: "none",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(102,126,234,0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#5a67d8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#667eea";
              }}
              onClick={() => {
                setShowManageAddresses(!showManageAddresses);
                setShowPersonalInfo(false);
              }}
            >
              <h3 style={{
                fontSize: "1.2rem",
                color: "#fff",
                marginBottom: "8px",
                fontFamily: "momo trust display",
                fontWeight: "bold",
                pointerEvents: "none"
              }}>
                Manage Addresses
              </h3>
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

            {/* Manage Addresses Section */}
            {showManageAddresses && (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "12px",
                  padding: "30px",
                  marginBottom: "30px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  maxWidth: "1000px"
                }}
              >
                <h3 style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#184872",
                  marginBottom: "30px",
                  fontFamily: "momo trust display",
                  textAlign: "center"
                }}>
                  Manage Addresses
                </h3>

                {/* Add New Address Button */}
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <button
                    onClick={() => setShowAddAddressForm(true)}
                    style={{
                      background: "#28a745",
                      color: "#fff",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
                      fontFamily: "momo trust display",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#218838";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 16px rgba(40, 167, 69, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#28a745";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.3)";
                    }}
                  >
                    + Add New Address
                  </button>
                </div>

                {/* Saved Addresses */}
                <div style={{ marginBottom: "30px" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{
                      color: "#333",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      fontFamily: "momo trust display"
                    }}>
                      Saved Addresses
                    </h4>
                    <p style={{
                      color: "#666",
                      fontSize: "14px",
                      margin: "0",
                      fontFamily: "momo trust display"
                    }}>
                      Click "Set as Default" to change your primary delivery address
                    </p>
                  </div>

                  {addresses.length === 0 ? (
                    <p style={{
                      textAlign: "center",
                      color: "#666",
                      fontSize: "16px",
                      fontFamily: "momo trust display",
                      padding: "40px"
                    }}>
                      No addresses saved yet. Add your first address above.
                    </p>
                  ) : (
                    <div style={{ display: "grid", gap: "20px" }}>
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          style={{
                            border: address.isDefault ? "2px solid #667eea" : "2px solid #e9ecef",
                            borderRadius: "8px",
                            padding: "20px",
                            background: address.isDefault ? "rgba(102, 126, 234, 0.05)" : "#fff",
                            position: "relative"
                          }}
                        >
                          {address.isDefault && (
                            <span style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              background: "#6c757d",
                              color: "#fff",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontFamily: "momo trust display",
                              fontWeight: "bold"
                            }}>
                              Default
                            </span>
                          )}

                          <div style={{ position: "relative", minHeight: "120px" }}>
                            {/* Address Content */}
                            <div style={{ marginBottom: "60px" }}>
                              <h5 style={{
                                color: "#333",
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                marginBottom: "8px",
                                fontFamily: "momo trust display"
                              }}>
                                {address.type} Address
                              </h5>
                              <p style={{
                                color: "#333",
                                fontSize: "16px",
                                fontWeight: "bold",
                                marginBottom: "4px",
                                fontFamily: "momo trust display"
                              }}>
                                {address.name}
                              </p>
                              <p style={{
                                color: "#666",
                                fontSize: "14px",
                                marginBottom: "2px",
                                fontFamily: "momo trust display"
                              }}>
                                {address.phone}
                              </p>
                              <p style={{
                                color: "#666",
                                fontSize: "14px",
                                lineHeight: "1.4",
                                fontFamily: "momo trust display"
                              }}>
                                {address.address}, {address.city}, {address.state} - {address.pincode}
                              </p>
                            </div>

                            {/* Action Buttons - Positioned at bottom-right */}
                            <div style={{
                              position: "absolute",
                              bottom: "15px",
                              right: "15px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                              alignItems: "stretch",
                              width: "120px"
                            }}>
                              <button
                                onClick={() => setEditingAddress(address)}
                                style={{
                                  background: "#667eea",
                                  color: "#fff",
                                  border: "none",
                                  padding: "8px 12px",
                                  borderRadius: "5px",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  fontFamily: "momo trust display",
                                  transition: "all 0.2s ease",
                                  width: "100%"
                                }}
                                onMouseEnter={(e) => e.target.style.background = "#5a67d8"}
                                onMouseLeave={(e) => e.target.style.background = "#667eea"}
                              >
                                Edit
                              </button>
                              {!address.isDefault && (
                                <>
                                  <button
                                    onClick={() => handleDeleteAddress(address.id)}
                                    style={{
                                      background: "#667eea",
                                      color: "#fff",
                                      border: "none",
                                      padding: "8px 12px",
                                      borderRadius: "5px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      fontFamily: "momo trust display",
                                      transition: "all 0.2s ease",
                                      width: "100%"
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = "#5a67d8"}
                                    onMouseLeave={(e) => e.target.style.background = "#667eea"}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    onClick={() => handleSetDefaultAddress(address.id)}
                                    style={{
                                      background: "#667eea",
                                      color: "#fff",
                                      border: "none",
                                      padding: "8px 12px",
                                      borderRadius: "5px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      fontFamily: "momo trust display",
                                      transition: "all 0.2s ease",
                                      width: "100%"
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = "#5a67d8"}
                                    onMouseLeave={(e) => e.target.style.background = "#667eea"}
                                  >
                                    Set as Default
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Add/Edit Address Form */}
            {(showAddAddressForm || editingAddress) && (
              <div
                style={{
                  position: "fixed",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: "1000",
                  padding: "20px"
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setShowAddAddressForm(false);
                    setEditingAddress(null);
                  }
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "30px",
                    width: "100%",
                    maxWidth: "500px",
                    maxHeight: "90vh",
                    overflowY: "auto"
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 style={{
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    color: "#184872",
                    marginBottom: "20px",
                    fontFamily: "momo trust display",
                    textAlign: "center"
                  }}>
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h3>

                  <AddressForm
                    address={editingAddress}
                    onSave={(addressData) => {
                      if (editingAddress) {
                        handleUpdateAddress(editingAddress.id, addressData);
                      } else {
                        handleAddAddress(addressData);
                      }
                      setShowAddAddressForm(false);
                      setEditingAddress(null);
                    }}
                    onCancel={() => {
                      setShowAddAddressForm(false);
                      setEditingAddress(null);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Empty State Message */}
            {!showPersonalInfo && !showManageAddresses && (
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

// Address Form Component
function AddressForm({ address, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    type: address?.type || 'Home',
    name: address?.name || '',
    phone: address?.phone || '',
    address: address?.address || '',
    city: address?.city || '',
    state: address?.state || '',
    pincode: address?.pincode || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill in all fields');
      return;
    }
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {/* Address Type */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'momo trust display',
          fontSize: '14px'
        }}>
          Address Type:
        </label>
        <select
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'momo trust display',
            boxSizing: 'border-box'
          }}
        >
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Name */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'momo trust display',
          fontSize: '14px'
        }}>
          Full Name:
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter full name"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'momo trust display',
            boxSizing: 'border-box'
          }}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'momo trust display',
          fontSize: '14px'
        }}>
          Phone Number:
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Enter phone number"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'momo trust display',
            boxSizing: 'border-box'
          }}
          required
        />
      </div>

      {/* Address */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'momo trust display',
          fontSize: '14px'
        }}>
          Address:
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Enter full address"
          rows="3"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'momo trust display',
            boxSizing: 'border-box',
            resize: 'vertical'
          }}
          required
        />
      </div>

      {/* City */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'momo trust display',
          fontSize: '14px'
        }}>
          City:
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder="Enter city"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'momo trust display',
            boxSizing: 'border-box'
          }}
          required
        />
      </div>

      {/* State */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'momo trust display',
          fontSize: '14px'
        }}>
          State:
        </label>
        <input
          type="text"
          value={formData.state}
          onChange={(e) => handleChange('state', e.target.value)}
          placeholder="Enter state"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'momo trust display',
            boxSizing: 'border-box'
          }}
          required
        />
      </div>

      {/* Pincode */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          color: '#333',
          fontFamily: 'momo trust display',
          fontSize: '14px'
        }}>
          Pincode:
        </label>
        <input
          type="text"
          value={formData.pincode}
          onChange={(e) => handleChange('pincode', e.target.value)}
          placeholder="Enter pincode"
          maxLength="6"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'momo trust display',
            boxSizing: 'border-box'
          }}
          required
        />
      </div>

      {/* Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
        marginTop: '20px'
      }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: '#6c757d',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'momo trust display',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#5a6268'}
          onMouseLeave={(e) => e.target.style.background = '#6c757d'}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            background: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontFamily: 'momo trust display',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#0056b3'}
          onMouseLeave={(e) => e.target.style.background = '#007bff'}
        >
          {address ? 'Update Address' : 'Save Address'}
        </button>
      </div>
    </form>
  );
}

export default MyProfile;
