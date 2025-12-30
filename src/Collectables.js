import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const COLLECTABLES_BG =
  "https://images.unsplash.com/photo-1610209455607-89e8b3e0e393?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVycGxlJTIwZ2FsYXh5fGVufDB8fDB8fHww";

// Extracted the CenteredInfoCard as a separate component to resolve hooks error inside .map
function CenteredInfoCard({ text, onClick, backgroundImage }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        color: "white",
        fontWeight: "bold",
        fontFamily: "momo trust display",
        fontSize: "2.5em",
        textAlign: "center",
        padding: "50px 0",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "8px",
        boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
        minWidth: 320,
        minHeight: "200px",
        margin: "0 18px",
        userSelect: "none",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        willChange: "transform",
        cursor: onClick ? "pointer" : "default",
        textTransform: "none",
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
      {/* Dark overlay for better text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {text}
      </div>
    </div>
  );
}

function Collectables() {
  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100dvh",
        overflowY: "auto",
        backgroundImage: `url('${COLLECTABLES_BG}')`,
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
                text: "Paintings",
                backgroundImage: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFpbnRpbmdzfGVufDB8fDB8fHww",
                onClick: () => alert("Paintings clicked")
              },
              {
                text: "Jewellery",
                backgroundImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amV3ZWxsZXJ5JTIwY29sbGVjdGlvbnxlbnwwfHwwfHw%3D",
                onClick: () => alert("Jewellery clicked")
              },
              {
                text: "Other",
                backgroundImage: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80",
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

export default Collectables;
