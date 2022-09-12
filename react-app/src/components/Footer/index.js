import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="disclaimer">This website is a clone of Venmo.</div>
      <div className="connect-wrapper">
        Connect With Developer
        <div className="icon-links">
          <a
            href="https://github.com/reneeluo7/Renmo"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/rongrong-luo-renee"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
