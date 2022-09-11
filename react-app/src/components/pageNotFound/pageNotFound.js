import React from "react";
import NavBar from "../NavBar";

export default function PageNotFound() {
  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right">
        <h1>404 Page Not Found</h1>
        <h3>Please go back</h3>
      </div>
    </div>
  );
}
