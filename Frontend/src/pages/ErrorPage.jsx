// ErrorPage.js
import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ErrorPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #1a1d21 0%, #3a3d41 100%)",
        color: "white",
      }}
    >
      <Box>
        <ErrorOutlineIcon
          sx={{ fontSize: 60, color: "#ff3b30", mb: 2 }}
          className="animate-bounce"
        />
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Oops! The page youre looking for doesnt exist.
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffcc00",
              color: "#1a1d21",
              "&:hover": { backgroundColor: "#e6b800" },
            }}
          >
            Go Back Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default ErrorPage;
