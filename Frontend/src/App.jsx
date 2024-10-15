// App.js
import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout"; // Import the Layout component
import Home from "./pages/Home"; // Import the Home page component
import Exchange from "./pages/Exchange"; // Import the Exchange page component
import Portfolio from "./pages/Portfolio"; // Import the Portfolio page component
import Blogs from "./pages/Blogs"; // Import the Blogs page component
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Layout>
      {" "}
      {/* Wrap the routes with the Layout component */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
