import React from 'react';
import { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import getUserInitials from '../util/userInitial'
import { getCompletedTxns } from '../store/transaction';

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
            <div className="homepage-userinfo">
                <div className="user-initial">
                    {initial}
                </div>
                <div className="homepage-user-fullname">{user.firstName}  {user.lastName}</div>
            </div>
            <div className="homepage-user-txns">
                {transactions?.map(txn => (
                    <div className="txn-bar" key={txn.id}>
                        <div className="txn-bar-initial">{initial}</div>
                        <div className="txn-bar-info">

                            {user.id == txn.payer.id && txn.category == 'pay' && <div> You charged <span>{txn.payee.firstName} {txn.payee.lastName}</span> </div>}
                            {user.id == txn.payer.id && txn.category == 'request' && <div> <span>{txn.payee.firstName} {txn.payee.lastName}</span> charged You</div>}
                        </div>
                        <div className="txn-bar-amount">{txn.amount}</div>
    
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage