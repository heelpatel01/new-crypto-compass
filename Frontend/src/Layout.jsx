// Layout.js
import React from "react";
import Header from "./components/Header.jsx"; // Import the Header component
// import Footer from "./Footer"; // Import the Footer component

const Layout = ({ children }) => {
  return (
    <div>
      <Header /> {/* Render Header */}
      <main>{children}</main> {/* Main content area */}
      {/* <Footer /> Render Footer */}
    </div>
  );
};

export default Layout;
