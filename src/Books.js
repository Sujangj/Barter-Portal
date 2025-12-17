import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const BOOKS_BG =
  "https://images.unsplash.com/photo-1610209455607-89e8b3e0e393?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVycGxlJTIwZ2FsYXh5fGVufDB8fDB8fHww";

function Books() {
  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100dvh",
        overflowY: "auto",
        backgroundImage: `url('${BOOKS_BG}')`,
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
      <Header showBackButton={true} backButtonColor="red" />
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
          <div
            style={{
              marginBottom: "30px",
              fontSize: "2.5em",
              fontFamily: "'momo trust display', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
              color: "#184872",
            }}
          >
            Books Categories
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "800px",
              width: "100%",
            }}
          >
            <button
              style={{
                padding: "25px",
                background: `url(https://images.unsplash.com/photo-1521737604893-d14cc237f111?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3R1ZGllcyUyMGJvb2tzfGVufDB8fDB8fHww) center center / cover no-repeat`,
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "#fff",
                fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
                border: "none",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
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
                Studies related books
              </div>
            </button>
            <button
              style={{
                padding: "25px",
                background: `url(https://images.unsplash.com/photo-1513002749550-efd607039889?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm92ZWxzfGVufDB8fDB8fHww) center center / cover no-repeat`,
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "#fff",
                fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
                border: "none",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
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
                Novels
              </div>
            </button>
            <button
              style={{
                padding: "25px",
                background: `url(https://images.unsplash.com/photo-1510531704581-5b28709aa699?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2xkJTIwYm9va3N8ZW5mDB8fDB8fHww) center center / cover no-repeat`,
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "#fff",
                fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
                border: "none",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
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
                Others
              </div>
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Books;

