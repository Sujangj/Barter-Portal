import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./About.css";

// About page background image
const ABOUT_BG_URL =
  "https://images.unsplash.com/photo-1610209455607-89e8b3e0e393?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVycGxlJTIwZ2FsYXh5fGVufDB8fDB8fHww";

// About page component
function About() {

    return (
        <div
            style={{
                minHeight: "100vh",
                height: "100dvh",
                overflowY: "auto",
                background: `url(${ABOUT_BG_URL}) center center / cover no-repeat fixed`,
                position: "relative", // for stacking context for footer
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Header showBackButton={true} backButtonColor="red" />
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
                            About Barter Portal
                        </h2>

                        <div style={{
                            fontSize: "1.1em",
                            lineHeight: "1.6",
                            color: "#4e5688",
                            fontFamily: "momo trust display"
                        }}>
                            <p style={{ marginBottom: "20px" }}>
                                Welcome to <strong>Barter Portal</strong>, your premier destination for seamless trading and bartering experiences.
                                Our platform connects buyers, sellers, and traders in a community-driven marketplace designed to make
                                exchanging goods and services simple, secure, and rewarding.
                            </p>

                            <h3 style={{
                                color: "#184872",
                                marginBottom: "15px",
                                fontSize: "1.3em",
                                fontWeight: "600"
                            }}>
                                Our Mission
                            </h3>
                            <p style={{ marginBottom: "20px" }}>
                                To revolutionize the way people trade by providing a trusted, user-friendly platform that empowers
                                individuals and businesses to exchange value through innovative bartering solutions. We believe
                                in sustainable consumption and community building through meaningful exchanges.
                            </p>

                            <h3 style={{
                                color: "#184872",
                                marginBottom: "15px",
                                fontSize: "1.3em",
                                fontWeight: "600"
                            }}>
                                What We Offer
                            </h3>
                            <ul style={{
                                textAlign: "left",
                                marginBottom: "20px",
                                paddingLeft: "20px"
                            }}>
                                <li style={{ marginBottom: "8px" }}>📚 Browse and list items for trade</li>
                                <li style={{ marginBottom: "8px" }}>🏺 Connect with local traders</li>
                                <li style={{ marginBottom: "8px" }}>📱 Secure messaging system</li>
                                <li style={{ marginBottom: "8px" }}>🔧 Comprehensive item categories</li>
                                <li>⭐ Verified user community</li>
                            </ul>

                            <h3 style={{
                                color: "#184872",
                                marginBottom: "15px",
                                fontSize: "1.3em",
                                fontWeight: "600"
                            }}>
                                Join Our Community
                            </h3>
                            <p style={{ marginBottom: "40px" }}>
                                Whether you're looking to declutter your space, discover unique treasures, or simply connect
                                with like-minded individuals, Barter Portal is your gateway to a new way of trading.
                                Join thousands of satisfied users who have discovered the joy of bartering!
                            </p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default About;