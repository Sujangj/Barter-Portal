import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CenteredInfoCard from "./CenteredInfoCard";

function Collectables() {
  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100dvh",
        overflowY: "auto",
        backgroundColor: "#000",
        position: "relative", // for stacking context for footer
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
                onClick: () => alert("Paintings clicked"),
                backgroundImage: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFpbnRpbmdzfGVufDB8fDB8fHww"
              },
              {
                text: "Jewellery",
                onClick: () => alert("Jewellery clicked"),
                backgroundImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amV3ZWxsZXJ5JTIwY29sbGVjdGlvbnxlbnwwfHwwfHw%3D"
              },
              {
                text: "Other",
                onClick: () => alert("Other clicked"),
                backgroundImage: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80"
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
