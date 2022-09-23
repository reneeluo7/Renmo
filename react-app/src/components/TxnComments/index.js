import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserInitials, getUserFullName } from "../../util/nameconvert";
import CreateComment from "./CreateComment";
import "./TxnComments.css";
import EditComment from "./EditComment";
import { getCommentByTxn } from "../../store/comment";
import { getLikesByTxn, likeTxn, unlikeTxn } from "../../store/like";

function TxnComments() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const comments = useSelector((state) => state.comment?.comment);
  const targetTxn = location.state?.txn;
  const [isload, setIsLoad] = useState(false)

  useEffect(async () => {
    await dispatch(getCommentByTxn(targetTxn?.id)).then(()=> setIsLoad(true))
  }, [dispatch, targetTxn]);

  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right ">
        {!targetTxn && <h2 className="not-authorized">You are not authorized, please go back </h2>}
        {isload && targetTxn && (
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
                        <span>
                          {/* {getUserFullName(targetTxn.payer)} */}

                          <Link
                            to={{
                              pathname: `/u/${targetTxn.payer.username}`,
                              state: { user: targetTxn.payer },
                            }}
                          >
                            {getUserFullName(targetTxn.payer)}
                          </Link>
                        </span>
                      )}{" "}
                      paid{" "}
                      {user.id === targetTxn.payee.id ? (
                        <span>You</span>
                      ) : (
                        <span>
                          {/* {getUserFullName(targetTxn.payee)} */}
                          <Link
                            to={{
                              pathname: `/u/${targetTxn.payee.username}`,
                              state: { user: targetTxn.payee },
                            }}
                          >
                            {getUserFullName(targetTxn.payee)}
                          </Link>
                        </span>
                      )}{" "}
                    </div>
                    <div className="second-txn-date-line">
                      {targetTxn.created_at.slice(0, 16)}
                    </div>
                    <div className="third-txn-note-line">{targetTxn.note}</div>
                    <div className="forth-txn-comment-line">
                      <div className="like-btn">
                        <LikeClick txn={targetTxn} />
                      </div>
                      <div>
                        <i className="fa-sharp fa-solid fa-comment txnpage"></i>
                        {comments.length !== 0 && (
                          <span>{comments.length}</span>
                        )}
                      </div>
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
                        <span>
                          <Link
                            to={{
                              pathname: `/u/${targetTxn.payee.username}`,
                              state: { user: targetTxn.payee },
                            }}
                          >
                            {getUserFullName(targetTxn.payee)}
                          </Link>
                        </span>
                      )}{" "}
                      charged{" "}
                      {user.id === targetTxn.payer.id ? (
                        <span>You</span>
                      ) : (
                        <span>
                          <Link
                            to={{
                              pathname: `/u/${targetTxn.payer.username}`,
                              state: { user: targetTxn.payer },
                            }}
                          >
                            {getUserFullName(targetTxn.payer)}
                          </Link>
                        </span>
                      )}
                    </div>
                    <div className="second-txn-date-line">
                      {targetTxn.created_at.slice(0, 16)}
                    </div>
                    <div className="third-txn-note-line">{targetTxn.note}</div>
                    <div className="forth-txn-comment-line">
                      <div className="like-btn">
                        <LikeClick txn={targetTxn} />
                      </div>
                      <div>
                        <i className="fa-sharp fa-solid fa-comment txnpage"></i>
                        {comments.length !== 0 && (
                          <span>{comments.length}</span>
                        )}
                      </div>
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

const LikeClick = (txn) => {
  const user = useSelector((state) => state.session.user);
  const [isLiked, setIsLiked] = useState(txn.txn.likes?.includes(user.id));
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.like.likes);
  // const location = useLocation();
  // const targetUser = location.state?.user;

  useEffect(async () => {
    await dispatch(getLikesByTxn(txn.txn.id));
  }, [isLiked]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (isLiked === false) {
      await dispatch(likeTxn(txn.txn.id));
      setIsLiked(true);
    } else {
      await dispatch(unlikeTxn(txn.txn.id));
      setIsLiked(false);
    }
    // setIsLiked(!isLiked)
  };
  return (
    <>
      {isLiked ? (
        <i
          className="fa-solid fa-heart"
          style={{ color: "red" }}
          onClick={handleLike}
        />
      ) : (
        <i className="fa-regular fa-heart" onClick={handleLike} />
      )}
      {/* {likes.length !== 0 &&<span>{likes.length}</span>} */}
      {likes.length !== 0 && <span>{likes.length}</span>}
    </>
  );
};
