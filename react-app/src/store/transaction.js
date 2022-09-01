// constants
const LOAD_COMPLETED = 'transactions/GET_ALL_COMPLETED_TXNS'

// action
const loadCompleted = (transactions) => ({
    type: LOAD_COMPLETED,
    transactions
})


// thunk

export const getCompletedTxns= () => async dispatch => {
    const response = await fetch(`/api/transactions/`);
    if (response.ok) {
        const data = await response.json();
        console.log("---console log in thunk fetch from backend data", data)
        dispatch(loadCompleted(data.transactions));
        return response;
    }
}


// reducer
const initialState = { completed:[], incomplete:[] }
export default function reducer(state = initialState, action){
    let newState;
    switch(action.type) {
        case LOAD_COMPLETED:
            newState = {...state, completed:[...action.transactions], incomplete:[...state?.incomplete]};
            action?.transactions?.forEach(txn => {
                newState[txn?.id] = txn
            })
            return newState;



        default:
            return state;
    }

}