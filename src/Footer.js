import React from "react";

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

function Footer() {
    return (
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
                >
                    &copy;
                </span>
                2025 Barterportal.com
            </div>
        </footer>
    );
}

export default Footer;

