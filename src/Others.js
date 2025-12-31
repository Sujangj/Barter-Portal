import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CenteredInfoCard from "./CenteredInfoCard";

const OTHERS_BG =
  "https://images.unsplash.com/photo-1610209455607-89e8b3e0e393?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVycGxlJTIwZ2FsYXh5fGVufDB8fDB8fHww";


function Others() {
  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100dvh",
        overflowY: "auto",
        backgroundImage: `url('${OTHERS_BG}')`,
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
                text: "Groceries",
                backgroundImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
                onClick: () => alert("Groceries clicked")
              },
              {
                text: "Snacks",
                backgroundImage: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=900&q=80",
                onClick: () => alert("Snacks clicked")
              },
              {
                text: "Other",
                backgroundImage: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80",
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

export default Others;
