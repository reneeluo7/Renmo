import React from "react";
import NavBar from "./NavBar.js";
import './InitiateTxnForm.css'
import SearchUser from "./search/SearchUser.js";

const InitiateTxn = () => {
    return (
        <div className="homepage-container">
            <NavBar />
            <div className="homepage-right">
                <h1>Pay and Request</h1>
                <form >
                    <div className="payment-amount">
                        <div className="payment-amount-box">
                            <p className="dollar-sign">$</p>
                            <div className="amount-number">
                                <input type="text" autoFocus placeholder="0" value={0} className="Number"/>
                            </div>
                        </div>
                    </div>
                    <p></p>
                    <div className="search-user-input">
                        <div className="search-user-input-box">
                            <div>To</div> <SearchUser />
                        </div>
                    </div>
                    <div className="pay-note">
                        <div className="pay-note-board">
                            <textarea name="note" id="payform-note" cols="30" rows="5" placeholder="Note"></textarea>
                        </div>
                    </div>
                    <div className="pay-privacySection"></div>
                    <div className="pay-or-request-btns"></div>

                </form>


            </div>

        </div>
    )
}


export default InitiateTxn