import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInitials, getUserFullName } from "../util/nameconvert";
import { getCompletedTxns } from "../store/transaction";
import NavBar from "./NavBar.js";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getTargetUserTxns } from "../store/transaction";
import { getLikesByTxn, likeTxn, unlikeTxn } from "../store/like";


export default function UserPage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const location = useLocation();
  const targetUser = location.state?.user;
  const txns = useSelector((state) => state.transaction.target);
  const user = useSelector((state) => state.session?.user);
  const [isload, setIsLoad] = useState(false)
  

  useEffect(async () => {
    if (!targetUser || targetUser.id === undefined) {
      history.push('/home')
    } else {

      await dispatch(getTargetUserTxns(targetUser)).then(()=> setIsLoad(true));
    }
  }, [dispatch, targetUser]);

  return (
   
    <div className="homepage-container">
      <NavBar />
      {isload && 
      <div className="homepage-right">
        <div className="homepage-userinfo">
          <div className="user-initial">{getUserInitials(targetUser)}</div>
          <div className="homepage-user-fullname">
            {targetUser.firstName} {targetUser.lastName}
          </div>
          <div className="homepage-user-username">@{targetUser.username}</div>
        </div>
        <div className="homepage-user-txns">
          {txns &&
            txns.map((txn) => (
              <div className="txn-bar" key={txn.id}>
                {txn?.category === "pay" && (
                  <div className="txn-bar-left">
                    <div className="txn-bar-initial">
                      {getUserInitials(txn.payer)}
                    </div>
                    <div className="txn-bar-info">
                      <div className="topline">
                        {user.id === txn.payer.id ? (
                          <span>You</span>
                        ) : (
                          <span>
                            <Link to={{pathname:`/u/${txn.payer.username}`, state:{user:txn.payer}}}>{getUserFullName(txn.payer)}</Link>
                            </span>
                        )}{" "}
                        paid{" "}
                        {user.id === txn.payee.id ? (
                          <span>You</span>
                        ) : (
                          <span>
                            <Link 
                            to={{pathname:`/u/${txn.payee.username}`, state:{user:txn.payee}}}>
                              {getUserFullName(txn.payee)}
                              </Link>
                            </span>
                        )}{" "}
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
                {txn.category === "request" && (
                  <div className="txn-bar-left">
                    <div className="txn-bar-initial">
                      {getUserInitials(txn.payee)}
                    </div>
                    <div className="txn-bar-info">
                      <div className="topline">
                        {user.id === txn.payee.id ? (
                          <span>You</span>
                        ) : (
                          <span>
                            <Link 
                            to={{pathname:`/u/${txn.payee.username}`, state:{user:txn.payee}}}>
                              {getUserFullName(txn.payee)}
                              </Link>
                            </span>
                        )}{" "}
                        charged{" "}
                        {user.id === txn.payer.id ? (
                          <span>You</span>
                        ) : (
                          <span>
                            <Link to={{pathname:`/u/${txn.payer.username}`, state:{user:txn.payer}}}>{getUserFullName(txn.payer)}</Link>
                            </span>
                        )}
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
              </div>
            ))}
            {txns.length === 0 && <div className="no-txns"><p>There is no public feed</p></div>}
        </div>
      </div>
      }
      
    </div>
    
    
  );
}


const LikeClick = (txn) => {
  const user = useSelector(state => state.session.user)
  const [isLiked, setIsLiked] = useState(txn.txn.likes?.includes(user.id))
  const dispatch = useDispatch()
  const likes = useSelector(state => state.like.likes)
  const location = useLocation();
  const targetUser = location.state?.user;
  // const [isload, setIsLoad] = useState(false)
  
  useEffect( async() => {
     await dispatch(getTargetUserTxns(targetUser))
  }, [isLiked])

  const handleLike = async(e) => {
    e.preventDefault()
    if(isLiked === false) {
      await dispatch(likeTxn(txn.txn.id))
      setIsLiked(true)
    } else {
      await dispatch(unlikeTxn(txn.txn.id))
      setIsLiked(false)
    }
    // setIsLiked(!isLiked)
  }
  return (
    <>
     {isLiked ?  <i className="fa-solid fa-heart" style={{color: "red"}} onClick={handleLike}/> : <i className="fa-regular fa-heart" onClick={handleLike}/> }
     {/* {likes.length !== 0 &&<span>{likes.length}</span>} */}
     {txn.txn.likes.length !== 0 && <span>{txn.txn.likes.length}</span>}
    </>
  );
}
