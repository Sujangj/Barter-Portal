import React, { useState } from "react";

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
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
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
          background: backgroundImage ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.9)",
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

export default CenteredInfoCard;
