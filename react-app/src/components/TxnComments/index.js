import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserInitials, getUserFullName } from "../../util/nameconvert";
import CreateComment from "./CreateComment";
import "./TxnComments.css";
import EditComment from "./EditComment";
import { getCommentByTxn } from "../../store/comment";


function TxnComments() {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session?.user);
  const comments = useSelector((state) => state.comment?.comment);
 
  const targetTxn = location.state?.txn;

  useEffect(async () => {
    // await dispatch(setCommentTarget(targetTxn))
    await dispatch(getCommentByTxn(targetTxn?.id));
  }, [dispatch, targetTxn]);

  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right comments-page">
        {!targetTxn && <h2>You are not authorized, please go back </h2>}
        {targetTxn && (
          <div className="homepage-user-txns comments">
            <div className="txn-bar comment">
              {targetTxn?.category === "pay" && (
                <div className="txn-bar-left comment">
                  <div className="txn-bar-initial">
                    {getUserInitials(targetTxn.payer)}
                  </div>
                  <div className="txn-bar-info">
                    <div className="topline">
                      {user.id === targetTxn.payer.id ? (
                        <span>You</span>
                      ) : (
                        <span>{getUserFullName(targetTxn.payer)}</span>
                      )}{" "}
                      paid{" "}
                      {user.id === targetTxn.payee.id ? (
                        <span>You</span>
                      ) : (
                        <span>{getUserFullName(targetTxn.payee)}</span>
                      )}{" "}
                    </div>
                    <div className="second-txn-date-line">
                      {targetTxn.created_at.slice(0, 16)}
                    </div>
                    <div className="third-txn-note-line">{targetTxn.note}</div>
                    <div className="forth-txn-comment-line">
                      <i className="fa-sharp fa-solid fa-comment"></i>
                      {comments.length !== 0 && (
                        <span>{comments.length}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {targetTxn.category === "request" && (
                <div className="txn-bar-left">
                  <div className="txn-bar-initial">
                    {getUserInitials(targetTxn.payee)}
                  </div>
                  <div className="txn-bar-info">
                    <div className="topline">
                      {user.id === targetTxn.payee.id ? (
                        <span>You</span>
                      ) : (
                        <span>{getUserFullName(targetTxn.payee)}</span>
                      )}{" "}
                      charged{" "}
                      {user.id === targetTxn.payer.id ? (
                        <span>You</span>
                      ) : (
                        <span>{getUserFullName(targetTxn.payer)}</span>
                      )}
                    </div>
                    <div className="second-txn-date-line">
                      {targetTxn.created_at.slice(0, 16)}
                    </div>
                    <div className="third-txn-note-line">{targetTxn.note}</div>
                    <div className="forth-txn-comment-line">
                      <i className="fa-sharp fa-solid fa-comment"></i>
                      {targetTxn.comments.length !== 0 && (
                        <span>{targetTxn.comments.length}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="txn-bar-amount">
                {user.id === targetTxn.payer.id && (
                  <div style={{ color: "red" }}>
                    - ${targetTxn.amount.toFixed(2)}
                  </div>
                )}
                {user.id === targetTxn.payee.id && (
                  <div style={{ color: "green" }}>
                    + ${targetTxn.amount.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
            <div className="comment-area">
              <div>
                {comments &&
                  comments?.map((cmt) => (
                    <div className="txn-bar-left comment-list" key={cmt.id}>
                      <div className="txn-bar-initial comment-list">
                        {getUserInitials(cmt.user)}
                      </div>
                      <div className="txn-bar-info comment-list">
                        <div className="topline">
                          {getUserFullName(cmt.user)}
                        </div>
                        <EditComment cmt={cmt} />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="add-comment-container">
                <CreateComment txn={targetTxn} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TxnComments;
