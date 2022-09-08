import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { getUserInitials } from "../util/nameconvert";
import { useEffect } from "react";
import { getIncompleteTxns } from "../store/transaction";

import "./NavBar.css";

const NavBar = () => {
  const user = useSelector((state) => state.session?.user);
  const transactions = useSelector((state) => state.transaction?.incomplete);
  const initial = getUserInitials(user);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(getIncompleteTxns());
  }, [dispatch]);

  return (
    <nav className="nav-bar">
      <NavLink to="/home" exact={true}>
        <div className="app-logo">
          Renmo
        </div>
      </NavLink>
      <div className="nav-container">
        <div className="user-info">
          <NavLink to="/home" exact={true}>
            <div className="user-initial">{initial}</div>
          </NavLink>
          <div className="user-info-right">
            <div className="user-welcome">Hi, {user.firstName}</div>
            <div className="user-username">@{user.username}</div>
          </div>
        </div>
        <NavLink to="/pay" exact={true}>
        <div className="pay-btn">
          Pay or Request
        </div>
        </NavLink>
        {/* <div className="payment-method">
            Money will be transferred from your bank account
          </div> */}
        <div className="nav-links">
          <a href="/search">
            <div className="search"> Search</div>
          </a>
          <a href="/incomplete">
            <div className="incomplete">
              <div className="incomplete-left">Incomplete</div>
              {transactions.length > 0 && (
                <div className="incomplete-right">{transactions.length}</div>
              )}
            </div>
          </a>
          <LogoutButton />
        </div>
      </div>
      {/* <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul> */}
    </nav>
  );
};

export default NavBar;
