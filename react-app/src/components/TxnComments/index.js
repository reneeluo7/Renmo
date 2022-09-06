import React from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar";
import { useSelector, useDispatch } from "react-redux";


function TxnComments() {
    const targetTxn = useSelector(state => state.transaction.target);
    // console.log("888888 targetTxn:",targetTxn[0])
    const { id } = useParams();

    return (
        <div className="homepage-container">
             <NavBar />
             <div className="homepage-right">
                {Number(id) !== targetTxn[0]?.id && 
                    <h3>You are not authorized, please go back</h3>
                }
             </div>
        </div>
    )
}

export default TxnComments