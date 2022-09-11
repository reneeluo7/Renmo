import React, { useEffect } from "react";
import { useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar.js";
import { closeTxn } from "../store/transaction";
import { getUserInitials, getUserFullName } from "../util/nameconvert";
import "./Incomplete.css";
import "./HomePage.css";
import { cancelTransaction } from "../store/transaction";
import { Link } from "react-router-dom";
// import EditIncompleteTxn from "./txnForms/EditTxn.js";

const IncompletePage = () => {
  const user = useSelector((state) => state.session?.user);
  const transactions = useSelector((state) => state.transaction?.incomplete);
  // const initial = getUserInitials(user);
  const dispatch = useDispatch();

  // const history = useHistory()

  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right incomplete">
        <div className="incomplete-page-title">
          <h1>Incomplete</h1>
        </div>
        <div className="homepage-user-txns incomplete">
          {transactions &&
            transactions?.map((txn) => (
              <div className="txn-bar" key={txn.id}>
                {user.id === txn.payee.id && (
                  <div className="txn-bar-left">
                    <div className="txn-bar-initial">
                      {getUserInitials(txn.payer)}
                    </div>
                    <div className="txn-bar-info">
                      <div className="topline">
                        {" "}
                        Request to{" "}
                        <span>
                          <Link
                            to={{
                              pathname: `/u/${txn.payer.username}`,
                              state: { user: txn.payer },
                            }}
                          >
                            {getUserFullName(txn.payer)}
                          </Link>
                        </span>
                      </div>
                      <div className="second-txn-date-line">
                        {txn.created_at.slice(0, 16)}
                      </div>
                      <div className="third-txn-note-line">{txn.note}</div>
                      <div className="manage-btns-container">
                        <button
                          className="cancel-txn"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(cancelTransaction(txn.id));
                          }}
                        >
                          Cancel
                        </button>
                        <Link
                          to={{
                            pathname: `/transactions/${txn.id}/edit`,
                            state: { txn },
                          }}
                          className="edit-txn-btn"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                {user.id === txn.payer.id && (
                  <div className="txn-bar-left">
                    <div className="txn-bar-initial">
                      {getUserInitials(txn.payee)}
                    </div>
                    <div className="txn-bar-info">
                      <div className="topline">
                        {" "}
                        <span>
                          <Link to={{pathname:`/u/${txn.payee.username}`, state:{user:txn.payee}}}>{getUserFullName(txn.payee)}</Link>
                          </span> requests{" "}
                        <span>You</span> to pay
                      </div>
                      <div className="second-txn-date-line">
                        {txn.created_at.slice(0, 16)}
                      </div>
                      <div className="third-txn-note-line">{txn.note}</div>
                      <div className="manage-btns-container">
                        <DeleteClick txn={txn} />
                        <button
                          className="pay-txn"
                          onClick={() => dispatch(closeTxn(txn, txn.id))}
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="txn-bar-amount">
                  <div>${txn.amount.toFixed(2)}</div>
                </div>
              </div>
            ))}
          {transactions.length === 0 && (
            <div className="no-txns">
              <p>There is no incomplete transaction</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DeleteClick = ({ txn }) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    const declinedTxn = {
      amount: txn.amount,
      note: txn.note,
      privacy: txn.privacy,
      category: "Declined",
      pending: 0,
    };
    dispatch(closeTxn(declinedTxn, txn.id));
  };

  return (
    <>
      <button key={Math.random()} onClick={handleDelete}>
        Decline
      </button>
    </>
  );
};

export default IncompletePage;
