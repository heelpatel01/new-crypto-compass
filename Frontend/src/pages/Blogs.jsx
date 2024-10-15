// Blogs.js
import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

function Blogs() {
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
        <HourglassEmptyIcon
          sx={{ fontSize: 60, color: "#ffcc00", mb: 2 }}
          className="animate-spin"
        />
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          Coming Soon!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          We're working hard to bring you exciting content. Stay tuned!
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

export default Blogs;
