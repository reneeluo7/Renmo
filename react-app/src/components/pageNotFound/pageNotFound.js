import React from "react";
import NavBar from "../NavBar";
import './pageNotFound.css'

export default function PageNotFound() {
  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right-404">
        <h1>404 Page Not Found</h1>
        <h3>Please go back</h3>
      </div>
    </div>
  );
}
