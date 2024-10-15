import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #1a1d21 0%, #3a3d41 100%)",
        color: "white",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "60px",
            color: "#ff3b30",
            marginBottom: "16px",
            animation: "bounce 2s infinite",
          }}
        >
          ⚠️
        </div>
        <h1 style={{ fontSize: "3rem", marginBottom: "16px" }}>
          404 - Page Not Found
        </h1>
        <p style={{ fontSize: "1rem", marginBottom: "32px" }}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              backgroundColor: "#ffcc00",
              color: "#1a1d21",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e6b800")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ffcc00")}
          >
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
