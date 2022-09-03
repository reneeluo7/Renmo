import React from "react";
import NavBar from "./NavBar.js";
import './InitiateTxnForm.css'

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
                    <div className="search-user-input"></div>
                    <div className="pay-note"></div>
                    <div className="pay-privacySection"></div>
                    <div className="pay-or-request-btns"></div>

                </form>


            </div>

        </div>
    )
}


export default InitiateTxn