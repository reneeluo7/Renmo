import React, { useState }  from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import { useSelector, useDispatch } from "react-redux";
import { getUserInitials, getUserFullName } from "../../util/nameconvert";
import CreateComment from "./CreateComment";
import './index.css'

function TxnComments() {
    // const [isLoad, setLoaded] = useState(false)  
  const targetArr = useSelector((state) => state.transaction.target);
  // console.log("888888 targetTxn:",targetTxn[0])
  const targetTxn = targetArr[0];
  const user = useSelector((state) => state.session?.user);
  const { id } = useParams();

  return (
     <div className="homepage-container">
      <NavBar />
      <div className="homepage-right">
        {Number(id) !== targetTxn?.id && (
          <h3>You are not authorized, please go back</h3>
        )}
        <div className="homepage-user-txns comments-page">
          <div className="txn-bar">
            {targetTxn?.category === "pay" && (
              <div className="txn-bar-left">
                <div className="txn-bar-initial">
                  {getUserInitials(targetTxn.payer)}
                </div>
                <div className="txn-bar-info">
                  <div className="topline">
                    {user.id === targetTxn.payer.id ? (
                      <span>You</span>
                    ) : (
                      <span>{getUserFullName(targetTxn.payer)}</span>
                    )} {" "}
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
                    {targetTxn.comments.length !== 0 && (
                      <span>{targetTxn.comments.length}</span>
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
                {targetTxn.comments && targetTxn.comments?.map(cmt => (
                    <div className="txn-bar-left">
                        <div className="txn-bar-initial">{getUserInitials(cmt.user)}</div>
                        <div className="txn-bar-info">
                        <div className="topline">{getUserFullName(cmt.user)}</div>
                        <div className="third-txn-note-line">{cmt.content}</div>
                        </div>
                    </div>
                    
                )) }
                <div className="add-comment-container" >
                    < CreateComment />
                
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TxnComments;
