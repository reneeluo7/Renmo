import React from "react";
import { Link } from "react-router-dom";
import "./SplashPage.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function SplashPage() {
  const user = useSelector((state) => state.session.user);
  if (user) return <Redirect to="/home" />;

  return (
    <div className="splash-main">
      <div className="splash-top-bar">
        <div className="splash-top-bar-container">
          <div className="top-bar-left">
            <div className="app-logo">Renmo</div>
          </div>
          <div className="top-bar-right">
            <Link to="/login">
              <div className="log-in">Log In</div>
            </Link>
            <Link to="/sign-up">
              <div className="sign-up">Sign Up</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="splash-main-container">
        <div className="splash-main-content">
          <div className="splash-main-left">
            <p className="slogan-large">Fast, safe, social payments</p>
            <p className="slogan-small">
              Pay. Get paid. Share. Join your friends on Renmo.
            </p>
            <Link to="/login">
              <button className="splash-start-btn">
                <div className="get-start-btn">Get Started</div>
              </button>
            </Link>
            <div className="connect-wrapper">
              Connect With Developer
              <div className="icon-links">
                <a href="https://github.com/reneeluo7/Renmo">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/rongrong-luo-renee">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="splash-main-right">
            <img src="https://i.imgur.com/bLBq6nQ.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
