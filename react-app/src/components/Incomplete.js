import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar.js";
import { getIncompleteTxns } from "../store/transaction";
import {getUserInitials, getUserFullName} from "../util/nameconvert";

const IncompletePage = () => {
  const user = useSelector((state) => state.session?.user);
  const transactions = useSelector((state) => state.transaction?.incomplete);
  const initial = getUserInitials(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIncompleteTxns());
  }, [dispatch]);

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
                      Request to{" "}
                      <span>
                        {getUserFullName(txn.payer)}{" "}
                      </span>
                    </div>
                    <div className="second-txn-date-line">
                      {txn.created_at.slice(0, 16)}
                    </div>
                    <div className="thrid-txn-note-line">{txn.note}</div>
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
                        {getUserFullName(txn.payee)}{" "}
                      </span>{" "}
                      requests <span>You</span> to pay
                    </div>
                    <div className="second-txn-date-line">
                      {txn.created_at.slice(0, 16)}
                    </div>
                    <div className="thrid-txn-note-line">{txn.note}</div>
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
