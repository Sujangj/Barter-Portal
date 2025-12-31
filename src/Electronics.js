import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CenteredInfoCard from "./CenteredInfoCard";

const ELECTRONICS_BG =
  "https://images.unsplash.com/photo-1610209455607-89e8b3e0e393?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVycGxlJTIwZ2FsYXh5fGVufDB8fDB8fHww";


function Electronics() {
  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100dvh",
        overflowY: "auto",
        backgroundImage: `url('${ELECTRONICS_BG}')`,
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
            <Header showBackButton={true} backButtonColor="#dc3545" />
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 60px)", // Account for header
          paddingTop: "60px" // Offset for fixed header
        }}
      >
        <main
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
            color: "#333",
          }}
        >
          {/* Multiple centered content placeholders */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap"
            }}
          >
            {[
              {
                text: "Smart Phone",
                backgroundImage: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1200&q=80",
                onClick: () => alert("Smart Phone clicked")
              },
              {
                text: "Laptop/PC",
                backgroundImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
                onClick: () => alert("Laptop/PC clicked")
              },
              {
                text: "Other",
                backgroundImage: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=80",
                onClick: () => alert("Other clicked")
              }
            ].map((item, idx) => (
              <CenteredInfoCard text={item.text} onClick={item.onClick} backgroundImage={item.backgroundImage} key={idx} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Electronics;
