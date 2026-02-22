import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#0f172a",
        color: "white",
        padding: "14px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "22px" }}>✈️</span>
        <h2 style={{ margin: 0 }}>Travel Explorer</h2>
      </div>

      <ul
        style={{
          display: "flex",
          gap: "18px",
          listStyle: "none",
          margin: 0,
          padding: 0
        }}
      >
        <li>
          <Link style={{ color: "white", textDecoration: "none" }} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link style={{ color: "white", textDecoration: "none" }} to="/packages">
            Packages
          </Link>
        </li>
        <li>
          <Link style={{ color: "white", textDecoration: "none" }} to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
