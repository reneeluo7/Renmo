import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import getUserInitials from '../util/userInitial'



const NavBar = () => {
  const user = useSelector(state => state.session?.user)
  const initial = getUserInitials(user)

  return (
    <nav>
      <div className="app-logo"> 
      <NavLink to='/' exact={true}>

        <h1>Renmo (app-logo)</h1>
      </NavLink>
      </div>
        <div className="nav-container">
          <div className="user-info">
            <div className="user-initial">
                {initial}
            </div>
            <div className="user-info-right">
              <div className="user-welcome">Hi, {user.firstName}</div>
              <div className="user-username">@{user.username}</div>
            </div>
          </div>
          <div className="pay-btn"> 
          <button>
            Pay or Request button
          </button>
          </div>
          {/* <div className="payment-method">
            Money will be transferred from your bank account
          </div> */}
          <div className="nav-links">
              <button className="search">Search</button>
              <button className="incomplete">Incomplete</button>
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
}

export default NavBar;
