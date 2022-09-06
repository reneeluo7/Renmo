import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar.js";
import { useHistory, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserFullName } from "../../util/nameconvert.js";
import { getIncompleteTxns, editTransaction } from "../../store/transaction";

const EditIncompleteTxn = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
 
  const txn = location.state?.txn;
  
  const [amount, setAmount] = useState(txn?.amount);
  const [note, setNote] = useState(txn?.note);
  const [isPublic, setIsPublic] = useState(true);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let privacy;
    isPublic ? (privacy = "public") : (privacy = "private");
    if (Number(amount) <= 0) {
      setErrors({ amount: ["Please enter a value grater than 0!"] });
      return;
    }

    if (!note) {
      setErrors({ note: ["Please enter some details regarding the payment"] });
      return;
    }
    if (note.length > 300) {
      setErrors({ note: ["Maximum note length is 300 characters"] });
      return;
    }

    const editTxn = {
      amount,
      note,
      privacy,
      category: "request",
      pending: 1,
    };
    console.log("**** edit txn:", editTxn);
    if (Object.keys(errors).length === 0) {
      const data = await dispatch(editTransaction(editTxn, txn.id));
      if (data) {
        setErrors(data);
      } else {
        setErrors({});
        return history.push("/incomplete");
      }
    }
  };

  

  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right">
        { (!txn || user.id !== txn?.payee?.id ) &&
            
          <h2>You are not authorized, please go back</h2>
            }
        { txn && 

        <div className="edit-form-container">

        <h1>Edit Your Transaction</h1>
        <h3>Only amount, note and privacy can be edited</h3>
        <form onSubmit={handleSubmit}>
          <div>
            {/* {message && message?.map((error, ind) => (
              <div key={ind} className="form-errors" style={{ color: "red" }}>
                {error}
              </div>
            ))} */}
            {/* {errors && errors?.map((error, ind) => (
              <div key={ind} className="form-errors" style={{ color: "red" }}>
                {error}
              </div>
            ))} */}
          </div>
          <div className="payment-amount">
            <div className="payment-amount-box">
              <p className="dollar-sign">$</p>
              <div className="amount-number">
                <input
                  type="Number"
                  className="Number"
                  autoFocus
                  placeholder="0"
                  value={amount}
                  min={0}
                  max={3000}
                  step={0.01}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                {errors.amount && Number(amount) <= 0 && (
                  <div className="error" style={{ color: "red" }}>
                    {errors?.amount?.map((error, ind) => (
                      <div key={ind}>{error}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <p></p>
          <div className="search-user-input">
            <div className="search-user-input-box">
              <label>To </label>{" "}
              <input type="text" disabled value={getUserFullName(txn?.payer)} />
            </div>
            {/* {errors?.recipient &&  !selectedUser &&
              <div className="error" style={{ color: "red" }}>
                {errors?.recipient?.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
            } */}
          </div>
          <div className="pay-note">
            <div className="pay-note-board">
              <label>
                Note<span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="note"
                id="payform-note"
                cols="30"
                rows="5"
                placeholder="Enter some details regarding the payment"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
            {errors?.note && !note && (
              <div className="error" style={{ color: "red" }}>
                {errors?.note?.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
            )}
          </div>
          <div className="pay-privacySection">
            <button
              className="pay-privacy-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsPublic(!isPublic);
              }}
            >
              {!isPublic ? <h6>Private</h6> : <h6>Public</h6>}
            </button>
          </div>
          <div className="edit-txn-submit-btn">
            <button className="edit-submit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
        </div>
        }
      </div>
    </div>
  );
};

export default EditIncompleteTxn;
