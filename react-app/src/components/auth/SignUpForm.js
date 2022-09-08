import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(firstName, lastName, username, email, password)
      );

      if (data) {
        setErrors(data);
      }
    } else {
      let err = ["Password and Repeat password does not match"];
      setErrors(err);
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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
            <Link to="/login">
              <div className="log-in">Log In</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="auth-page-form-container">
        <div className="form-title">
          <h3>Sign up to Renmo</h3>
        </div>

        <form onSubmit={onSignUp} className="auth-form sign-up">
          <div style={{ color: "red" }} className="errors-show">
            {errors?.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label className="auth-form-input-label">
              <span className="label-text">First Name</span>
              <input
                className="auth-form-input-bar"
                type="text"
                name="firstName"
                onChange={updateFirstName}
                value={firstName}
                // required={true}
              ></input>
            </label>
          </div>
          <div>
            <label className="auth-form-input-label">
              <span className="label-text">Last Name</span>
              <input
                className="auth-form-input-bar"
                type="text"
                name="lastName"
                onChange={updateLastName}
                value={lastName}
                // required={true}
              ></input>
            </label>
          </div>
          <div>
            <label className="auth-form-input-label">
              <span className="label-text">User Name</span>
              <input
                className="auth-form-input-bar"
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                // required={true}
              ></input>
            </label>
          </div>
          <div>
            <label className="auth-form-input-label">
              <span className="label-text">Email</span>
              <input
                className="auth-form-input-bar"
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </label>
          </div>
          <div>
            <label className="auth-form-input-label">
              <span className="label-text">Password</span>
              <input
                className="auth-form-input-bar"
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                // required={true}
              ></input>
            </label>
          </div>
          <div>
            <label className="auth-form-input-label">
              <span className="label-text">Repeat Password</span>
              <input
                className="auth-form-input-bar"
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                // required={true}
              ></input>
            </label>
          </div>
          <div className="button-wrapper">
            <button type="submit" className="sign-up-sub-btn">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
