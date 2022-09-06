import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";
import { getUserInitials, getUserFullName } from "../util/nameconvert";
import { getCompletedTxns, setCommentTarget } from "../store/transaction";
import { getAllUsers } from "../store/session";
import NavBar from "./NavBar.js";
import "./HomePage.css";
import { Link } from "react-router-dom";
import TxnComments from "./TxnComments";

const HomePage = () => {
  const user = useSelector((state) => state.session?.user);
  const transactions = useSelector((state) => state.transaction?.completed);
  const initial = getUserInitials(user);
  const dispatch = useDispatch();
  const [isLoad, setLoaded] = useState(false) 

  useEffect(() => {
    dispatch(getCompletedTxns());
    // dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right">
        <div className="homepage-userinfo">
          <div className="user-initial">{initial}</div>
          <div className="homepage-user-fullname">
            {user.firstName} {user.lastName}
          </div>
          <div className="homepage-user-username">@{user.username}</div>
        </div>

        <div className="homepage-user-txns">
          {transactions?.map((txn) => (
            <div className="txn-bar" key={txn.id}>
              {user.id === txn.payer.id && txn.category === "pay" && (
                <div className="txn-bar-left">
                  <div className="txn-bar-initial">{initial}</div>
                  <div className="txn-bar-info">
                    <div className="topline">
                      <span>You</span> paid{" "}
                      <span>{getUserFullName(txn.payee)}</span>{" "}
                    </div>
                    <div className="second-txn-date-line">
                      {txn.created_at.slice(0, 16)}
                    </div>
                    <div className="third-txn-note-line">{txn.note}</div>
                    <div className="forth-txn-comment-line">
                      <Link to={`/transactions/${txn.id}/comments`}>
                        <div
                          onClick={() => {
                            dispatch(setCommentTarget(txn));
                          }}
                        >
                          <i className="fa-sharp fa-solid fa-comment"></i>
                          {txn.comments.length !== 0 && (
                            <span>{txn.comments.length}</span>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {user.id === txn.payer.id && txn.category === "request" && (
                <div className="txn-bar-left">
                  <div className="txn-bar-initial">
                    {getUserInitials(txn.payee)}
                  </div>
                  <div className="txn-bar-info">
                    <div className="topline">
                      {" "}
                      <span>{getUserFullName(txn.payee)}</span> charged{" "}
                      <span>You</span>
                    </div>
                    <div className="second-txn-date-line">
                      {txn.created_at.slice(0, 16)}
                    </div>
                    <div className="third-txn-note-line">{txn.note}</div>
                    <div className="forth-txn-comment-line">
                      <Link to={`/transactions/${txn.id}/comments`}>
                        <button
                          onClick={() => {
                            dispatch(setCommentTarget(txn));
                          }}
                        >
                          <i className="fa-sharp fa-solid fa-comment"></i>
                          {txn.comments.length !== 0 && (
                            <span>{txn.comments.length}</span>
                          )}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {user.id === txn.payee.id && txn.category === "pay" && (
                <div className="txn-bar-left">
                  <div className="txn-bar-initial">
                    {getUserInitials(txn.payer)}
                  </div>
                  <div className="txn-bar-info">
                    <div className="topline">
                      {" "}
                      <span>
                        {getUserFullName(txn.payer)} paid <span>You</span>
                      </span>{" "}
                    </div>
                    <div className="second-txn-date-line">
                      {txn.created_at.slice(0, 16)}
                    </div>
                    <div className="third-txn-note-line">{txn.note}</div>
                    <div className="forth-txn-comment-line">
                      <Link to={`/transactions/${txn.id}/comments`}>
                        <button
                          onClick={() => {
                            dispatch(setCommentTarget(txn));
                          }}
                        >
                          <i className="fa-sharp fa-solid fa-comment"></i>
                          {txn.comments.length !== 0 && (
                            <span>{txn.comments.length}</span>
                          )}
                          
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {user.id === txn.payee.id && txn.category === "request" && (
                <div className="txn-bar-left">
                  <div className="txn-bar-initial">{initial}</div>
                  <div className="txn-bar-info">
                    <div className="topline">
                      {" "}
                      <span>
                        <span>You</span> charged {getUserFullName(txn.payer)}
                      </span>{" "}
                    </div>
                    <div className="second-txn-date-line">
                      {txn.created_at.slice(0, 16)}
                    </div>
                    <div className="third-txn-note-line">{txn.note}</div>
                    <div className="forth-txn-comment-line">
                      <Link to={`/transactions/${txn.id}/comments`}>
                        <button
                          onClick={() => {
                            dispatch(setCommentTarget(txn));
                          }}
                        >
                          <i className="fa-sharp fa-solid fa-comment"></i>
                          {txn.comments.length !== 0 && (
                            <span>{txn.comments.length}</span>
                          )}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              <div className="txn-bar-amount">
                {user.id === txn.payer.id && (
                  <div style={{ color: "red" }}>- ${txn.amount.toFixed(2)}</div>
                )}
                {user.id === txn.payee.id && (
                  <div style={{ color: "green" }}>
                    + ${txn.amount.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
