import React from 'react';
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './NavBar.js';
import { getIncompleteTxns } from '../store/transaction';
import getUserInitials from '../util/userInitial'


const IncompletePage = () => {
    const user = useSelector(state => state.session?.user)
    const transactions = useSelector(state => state.transaction?.incomplete)
    const initial = getUserInitials(user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getIncompleteTxns())
        
    }, [dispatch])

    return (
        <div className="homepage-container">
            <NavBar />
            <div className='homepage-right incomplete'>
                <h1>Incomplete</h1>
                <div className="homepage-user-txns incomplete">
                {/* {transactions?.map(txn => (
                    <div className="txn-bar" key={txn.id}>
                        <div className="txn-bar-left">
                            {user.id == txn.payee.id && 
                            <div className="txn-bar-initial">{initial}</div>
                            <div className="txn-bar-info"></div>

                            }
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
                                - {txn.amount.toFixed(2)}

                            </div>}
                            {user.id == txn.payee.id && <div style={{color: 'green'}}>
                                + {txn.amount.toFixed(2)}

                            </div>}
                        
                        </div>
    
                    </div>
                ))} */}
                </div>


            </div>

        </div>
    )


}
export default IncompletePage