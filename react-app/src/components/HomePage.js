import React from 'react';
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import getUserInitials from '../util/userInitial' 
import { getCompletedTxns } from '../store/transaction';
import NavBar from './NavBar.js'
import './HomePage.css'

const HomePage = () => {
    const user = useSelector(state => state.session?.user)
    const transactions = useSelector(state => state.transaction?.completed)
    const initial = getUserInitials(user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getCompletedTxns())
        
    }, [dispatch])

    return (
        <div className="homepage-container">
            <NavBar />
            <div className='homepage-right'>

                <div className="homepage-userinfo">
                <div className="user-initial">
                    {initial}
                </div>
                <div className="homepage-user-fullname">{user.firstName}  {user.lastName}</div>
                <div className="homepage-user-username">@{user.username}</div>
                </div>
                
                <div className="homepage-user-txns">
                {transactions?.map(txn => (
                    <div className="txn-bar" key={txn.id}>
                        <div className="txn-bar-left">

                            <div className="txn-bar-initial">{initial}</div>
                            <div className="txn-bar-info">

                            {user.id == txn.payer.id && txn.category == 'pay' && 
                            <div><span>You</span> paid <span>{txn.payee.firstName} {txn.payee.lastName}</span> </div>
                            }
                            {user.id == txn.payer.id && txn.category == 'request' && <div> <span>{txn.payee.firstName} {txn.payee.lastName}</span> charged <span>You</span></div>}
                            {user.id == txn.payee.id && txn.category == 'pay' && <div> <span>{txn.payer.firstName} {txn.payer.lastName} paid <span>You</span></span> </div>}
                            {user.id == txn.payee.id && txn.category == 'request' && <div> <span><span>You</span> charged {txn.payer.firstName} {txn.payer.lastName}</span> </div>}

                         </div>
                        </div>
                        <div className="txn-bar-amount">
                            {user.id == txn.payer.id && <div style={{color: 'red'}}>
                                - ${txn.amount.toFixed(2)}

                            </div>}
                            {user.id == txn.payee.id && <div style={{color: 'green'}}>
                                + ${txn.amount.toFixed(2)}

                            </div>}
                        
                        </div>
    
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage