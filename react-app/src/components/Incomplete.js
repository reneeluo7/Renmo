import React, { useEffect } from "react";
import { useHistory } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar.js";
import { getIncompleteTxns } from "../store/transaction";
import { getUserInitials, getUserFullName } from "../util/nameconvert";
import "./Incomplete.css";
import { cancelTransaction } from "../store/transaction";
import { Link } from "react-router-dom";
// import EditIncompleteTxn from "./txnForms/EditTxn.js";

const IncompletePage = () => {
  const user = useSelector((state) => state.session?.user);
  const transactions = useSelector((state) => state.transaction?.incomplete);
  // const initial = getUserInitials(user);
  const dispatch = useDispatch();
  // const history = useHistory()

  // useEffect(async() => {
  //   await dispatch(getIncompleteTxns());
  // }, [dispatch]);

  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right incomplete">
        <h1>Incomplete</h1>
        <div className="homepage-user-txns incomplete">
          {transactions?.map((txn) => (
            <div className="txn-bar" key={txn.id}>
              {user.id === txn.payee.id && (
                <div className="txn-bar-left">
                  <div className="txn-bar-initial">
                    {getUserInitials(txn.payer)}
                  </div>
                  <div className="txn-bar-info">
                    <div className="topline">
                      {" "}
                      Request to <span>{getUserFullName(txn.payer)} </span>
                    </div>
                    <div className="second-txn-date-line">
                      {txn.created_at.slice(0, 16)}
                    </div>
                    <div className="thrid-txn-note-line">{txn.note}</div>
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
                      <Link to={`/transactions/${txn.id}/edit`}>
                        {/* <button className="edit-txn"> Edit
                        </button> */}
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
                      <span>{getUserFullName(txn.payee)} </span> requests{" "}
                      <span>You</span> to pay
                    </div>
                    <div className="second-txn-date-line">
                      {txn.created_at.slice(0, 16)}
                    </div>
                    <div className="thrid-txn-note-line">{txn.note}</div>
                    <div className="manage-btns-container">
                      <button className="decline-txn">Decline</button>
                      <button className="pay-txn">Pay</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="txn-bar-amount">
                <div>${txn.amount.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default IncompletePage;
