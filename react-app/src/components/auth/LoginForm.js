import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="auth-page-container">
      <div className="auth-page-top-bar">
        <div className="auth-page-top-bar-container">
          <div className="top-bar-left">
            <Link to="/">
              <div className="app-logo">Renmo</div>
            </Link>
          </div>
          <div className="top-bar-right">
            <Link to="/sign-up">
              <div className="sign-up">Sign Up</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="auth-page-form-container">
        <div className="form-title">
          <h3>Sign in to Renmo</h3>
        </div>

        <form onSubmit={onLogin} className="auth-form">
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor="email" className="auth-form-input-label">
              <span className="label-text">Email</span>
              <input
                className="auth-form-input-bar"
                name="email"
                type="text"
                // placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password" className="auth-form-input-label">
              <span className="label-text">Password </span>
              <input
                className="auth-form-input-bar"
                name="password"
                type="password"
                // placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </label>
            <div className="button-wrapper">
              <button type="submit">Login</button>
              <button onClick={demoLogin}>Demo User</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
