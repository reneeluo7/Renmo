import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar.js";
import "./InitiateTxnForm.css";
import SearchUser from "../Search/SearchUser.js";
import { createTxn } from "../../store/transaction.js";

const InitiateTxn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const loggedInUser = useSelector((state) => state.session.user);
  const selectedUser = useSelector((state) => state.session.selected);
  const [amount, setAmount] = useState();
  const [note, setNote] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [errors, setErrors] = useState({});
  // const [message, setMessage] = useState({})

  // console.log('-----set amount', amount)
  // console.log('-----set note', note)
  // console.log('-----set privacy', isPublic)
  // console.log('-----selected user', selectedUser?.id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([])
    let category = e.target.value;
    // console.log('----set category', category)
    let pending;
    category === "pay" ? (pending = 0) : (pending = 1);
    let privacy;
    isPublic ? (privacy = "public") : (privacy = "private");
    // console.log(privacy)
    if (Number(amount) <= 0) {
      setErrors({ amount: ["Please enter a value grater than 0!"] });
      return;
    } 
    if (!selectedUser) {
      setErrors({ recipient: ["Please enter a recipient"] });
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

    const newTxn = {
      amount,
      note,
      privacy,
      pending,
      category,
    };
    // console.log("****** newTXN: ", newTxn);
    // if (errors.length === 0){

      const data = await dispatch(createTxn(newTxn, selectedUser.id));
      console.log('----data return from thunk', data)
      if (data) {
        setErrors(data);
      } else {
        setErrors({});
        return history.push('/home');
       
      }
    // }
  };

  return (
    <div className="homepage-container">
      <NavBar />
      <div className="homepage-right">
        <h1>Pay and Request</h1>
        <form>
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
              <div className="dollar-sign">$</div>
              <div className="amount-number">
                <input
                  type="number"
                  className="Number"
                  // autoFocus
                  placeholder="0"
                  value={amount}
                  min='0'
                  max='3000'
                  step='0.01'
                  // pattern="^\d*(\.\d{0,2})?$"
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                {errors.amount && Number(amount) <= 0 &&
                  <div className="error" style={{ color: "red" }}>
                    {errors?.amount?.map((error, ind) => (
                      <div key={ind}>{error}</div>
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>
          <p></p>
          <div className="search-user-input">
            <div className="search-user-input-box">
              <label>To <span style={{ color: "red" }}>*</span></label> <SearchUser />
            </div>
            {errors?.recipient &&  !selectedUser &&
              <div className="error" style={{ color: "red" }}>
                {errors?.recipient?.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
            }
          </div>
          <div className="pay-note">
            <div className="pay-note-board">
              <label>Note<span style={{ color: "red" }}>*</span></label>
              <textarea
                name="note"
                id="payform-note"
                cols="30"
                rows="5"
                value={note}
                placeholder="Enter some details regarding the payment"
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
            {errors?.note &&
              <div className="error" style={{ color: "red" }}>
                {errors?.note?.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
            }
            
            
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
          <div className="pay-or-request-btns">
            <button
              className="pay-btn-form"
              value={"pay"}
              type="submit"
              onClick={handleSubmit}
            >
              Pay
            </button>
            <button
              className="request-btn-form"
              value={"request"}
              type="submit"
              onClick={handleSubmit}
            >
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InitiateTxn;
