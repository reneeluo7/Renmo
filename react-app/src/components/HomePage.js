import React from "react";
import { useEffect, useState } from "react";
// import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";
import { getUserInitials, getUserFullName } from "../util/nameconvert";
import { getCompletedTxns } from "../store/transaction";
import { getLikesByTxn, likeTxn, unlikeTxn } from "../store/like";
import NavBar from "./NavBar.js";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const user = useSelector((state) => state.session?.user);
  const transactions = useSelector((state) => state.transaction?.completed);
  const initial = getUserInitials(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompletedTxns());
  }, [dispatch]);

  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right homepagemain">
        <div className="homepage-userinfo">
          <div className="user-initial">{initial}</div>
          <div className="homepage-user-fullname">
            {user.firstName} {user.lastName}
          </div>
          <div className="homepage-user-username">@{user.username}</div>
        </div>
        {transactions && (
          <div className="homepage-user-txns">
            {transactions?.map((txn) => (
              <div className="txn-bar" key={txn.id}>
                {user.id === txn.payer.id && txn.category === "pay" && (
                  <div className="txn-bar-left">
                    <div className="txn-bar-initial">{initial}</div>
                    <div className="txn-bar-info">
                      <div className="topline">
                        <span>You</span> paid{" "}
                        <span>
                          <Link
                            to={{
                              pathname: `/u/${txn.payee.username}`,
                              state: { user: txn.payee },
                            }}
                          >
                            {getUserFullName(txn.payee)}
                          </Link>
                        </span>{" "}
                      </div>
                      <div className="second-txn-date-line">
                        {txn.created_at.slice(0, 16)}
                      </div>
                      <div className="third-txn-note-line">{txn.note}</div>
                      <div className="forth-txn-comment-line">
                        <div className="like-btn">
                          <LikeClick txn = {txn} />
                          </div>
                        <Link
                          to={{
                            pathname: `/transactions/${txn.id}/comments`,
                            state: { txn },
                          }}
                        >
                          <div>
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
                        <span>
                          <Link
                            to={{
                              pathname: `/u/${txn.payee.username}`,
                              state: { user: txn.payee },
                            }}
                          >
                            {getUserFullName(txn.payee)}
                          </Link>
                        </span>{" "}
                        charged <span>You</span>
                      </div>
                      <div className="second-txn-date-line">
                        {txn.created_at.slice(0, 16)}
                      </div>
                      <div className="third-txn-note-line">{txn.note}</div>
                      <div className="forth-txn-comment-line">
                      <div className="like-btn">
                          <LikeClick txn = {txn} />
                          </div>
                        <Link
                          to={{
                            pathname: `/transactions/${txn.id}/comments`,
                            state: { txn },
                          }}
                        >
                          <div>
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
                {user.id === txn.payee.id && txn.category === "pay" && (
                  <div className="txn-bar-left">
                    <div className="txn-bar-initial">
                      {getUserInitials(txn.payer)}
                    </div>
                    <div className="txn-bar-info">
                      <div className="topline">
                        {" "}
                        <span>
                          <Link
                            to={{
                              pathname: `/u/${txn.payer.username}`,
                              state: { user: txn.payer },
                            }}
                          >
                            {getUserFullName(txn.payer)}
                          </Link>
                        </span>{" "}
                        paid <span>You</span>
                      </div>
                      <div className="second-txn-date-line">
                        {txn.created_at.slice(0, 16)}
                      </div>
                      <div className="third-txn-note-line">{txn.note}</div>
                      <div className="forth-txn-comment-line">
                      <div className="like-btn">
                          <LikeClick txn = {txn} />
                          </div>
                        <Link
                          to={{
                            pathname: `/transactions/${txn.id}/comments`,
                            state: { txn },
                          }}
                        >
                          <div>
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
                {user.id === txn.payee.id && txn.category === "request" && (
                  <div className="txn-bar-left">
                    <div className="txn-bar-initial">{initial}</div>
                    <div className="txn-bar-info">
                      <div className="topline">
                        {" "}
                        <span>You</span> charged{" "}
                        <span>
                          <Link
                            to={{
                              pathname: `/u/${txn.payer.username}`,
                              state: { user: txn.payer },
                            }}
                          >
                            {getUserFullName(txn.payer)}
                          </Link>
                        </span>{" "}
                      </div>
                      <div className="second-txn-date-line">
                        {txn.created_at.slice(0, 16)}
                      </div>
                      <div className="third-txn-note-line">{txn.note}</div>
                      <div className="forth-txn-comment-line">
                      <div className="like-btn">
                          <LikeClick txn = {txn} />
                          </div>
                        <Link
                          to={{
                            pathname: `/transactions/${txn.id}/comments`,
                            state: { txn },
                          }}
                        >
                          <div>
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
                <div className="txn-bar-amount">
                  {user.id === txn.payer.id && txn.category !== "Declined" && (
                    <div style={{ color: "red" }}>
                      - ${txn.amount.toFixed(2)}
                    </div>
                  )}
                  {user.id === txn.payee.id && txn.category !== "Declined" && (
                    <div style={{ color: "green" }}>
                      + ${txn.amount.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {transactions.length === 0 && (
          <div className="no-txns-homepage">
            <p>No transaction yet...</p>

            <p>Pay your friends or request pay today</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LikeClick = (txn) => {
  const user = useSelector(state => state.session.user)
  const [isLiked, setIsLiked] = useState(txn.txn.likes?.includes(user.id))
  const dispatch = useDispatch()
  const likes = useSelector(state => state.like.likes)
  // console.log("-------txn", txn.txn.likes)
  useEffect( async () => {
     await dispatch(getCompletedTxns())
  }, [dispatch, isLiked])

  const handleLike = async(e) => {
    e.preventDefault()
    if(!isLiked) {
      await dispatch(likeTxn(txn.txn.id))
      setIsLiked(!isLiked)
    } else {
      await dispatch(unlikeTxn(txn.txn.id))
      setIsLiked(!isLiked)
    }
    setIsLiked(!isLiked)
  }
  return (
    <>
     {isLiked ?  <i className="fa-solid fa-heart" style={{color: "red"}} onClick={handleLike}/> : <i className="fa-regular fa-heart" onClick={handleLike}/> }
     {/* {likes.length !== 0 &&<span>{likes.length}</span>} */}
     {txn.txn.likes.length !== 0 && <span>{txn.txn.likes.length}</span>}
    </>
  );
}

export default HomePage;
