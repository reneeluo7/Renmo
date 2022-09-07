// constants
const LOAD_COMPLETED = "transaction/GET_ALL_COMPLETED_TXNS";
const LOAD_INCOMPLETE = "transaction/GET_ALL_INCOMPLETE_TXNS";
const ADD_NEW_TXN = "transaction/ADD_NEW_TXN";
const CANCEL_TXN = "transaction/CANCEL_TXN";
const EDIT_TXN = "transaction/EDIT_TXN";
const SET_TARGET = "transaction/SET_TARGET";


// -------action
const loadCompleted = (transactions) => ({
  type: LOAD_COMPLETED,
  transactions,
});
const loadIncomplete = (transactions) => ({
  type: LOAD_INCOMPLETE,
  transactions,
});
const addTxn = (txn) => ({
  type: ADD_NEW_TXN,
  txn,
});

const deleteTxn = (id) => ({
  type: CANCEL_TXN,
  id,
});

const editATxn = (txn) => ({
  type: EDIT_TXN,
  txn,
});

export const setCommentTarget = (txn) => ({
  type: SET_TARGET,
  txn,
})


// --------thunk
// GET
export const getCompletedTxns = () => async (dispatch) => {
  const response = await fetch(`/api/transactions/`);
  if (response.ok) {
    const data = await response.json();
    // console.log("---console log in thunk fetch from backend data", data)
    dispatch(loadCompleted(data.transactions));
    return response;
  }
};

export const getIncompleteTxns = () => async (dispatch) => {
  const response = await fetch(`/api/transactions/incomplete`);
  if (response.ok) {
    const data = await response.json();
    // console.log("---console log in thunk fetch from backend data", data)
    dispatch(loadIncomplete(data.transactions));
    return response;
  }
};

// POST
export const createTxn = (txn, recipientId) => async (dispatch) => {
    console.log('passed in from frontend', txn)
  const response = await fetch(`/api/transactions/pay/${recipientId}`, {
    method: ["POST"],
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: txn.amount,
      note: txn.note,
      category: txn.category,
      privacy: txn.privacy,
      pending: txn.pending,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(
      "---console log in create txn thunk fetch from backend data",
      data
    );
    dispatch(addTxn(data.transaction));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

//PUT
export const editTransaction = (txn, txnId) => async (dispatch) =>{
    const response = await fetch(`/api/transactions/${txnId}`, {
        method: ["PUT"],
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: txn.amount,
          note: txn.note,
          category: txn.category,
          privacy: txn.privacy,
          pending: txn.pending,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(
        //   "---console log in edit txn thunk fetch from backend data",
        //   data
        // );
        dispatch(editATxn(data.transaction));
        return null;
      } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
}



//DELETE
export const cancelTransaction = (txnId) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${txnId}`, {
    method: "DELETE",
  });
  const data = await response.json();
 
  if (response.ok) {
    await dispatch(deleteTxn(txnId))
}
return data;
};

// --------reducer
const initialState = { completed: [], incomplete: [], target:[] };
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_COMPLETED:
      newState = {
        ...state,
        completed: [...action.transactions],
        incomplete: [...state?.incomplete],
        target:[...state?.target]
      };
      action?.transactions?.forEach((txn) => {
        newState[txn?.id] = txn;
      });
      return newState;

    case LOAD_INCOMPLETE:
      newState = {
        ...state,
        completed: [...state?.completed],
        incomplete: [...action?.transactions],
        target:[...state?.target]
      };
      action?.transactions?.forEach((txn) => {
        newState[txn?.id] = txn;
      });
      return newState;

    case CANCEL_TXN:
      delete state[action.id];
      const newIncomplete = state.incomplete.filter(txn => txn.id !== action.id)
      newState = {
        ...state,
        completed: [...state?.completed],
        incomplete: [...newIncomplete],
        target:[...state?.target]
      };
      
      return newState;


    case ADD_NEW_TXN:
      if (action.txn.pending === true) {
        newState = {
          ...state,
          completed: [...state?.completed],
          incomplete: [...state?.incomplete, action.txn],
          target:[...state?.target]
        };
      } else
        newState = {
          ...state,
          completed: [...state?.completed, action.txn],
          incomplete: [...state?.incomplete],
          target:[...state?.target]
        };

      newState[action.txn.id] = action.txn;
      return newState;

      case EDIT_TXN:
        // let targetTxn = state.incomplete.filter(txn => txn.id === action.txn.id)
        // targetTxn = action.txn
        state?.incomplete?.forEach((txn,i) => {
            if(txn?.id === action?.txn?.id)  {
  
              state?.incomplete?.splice(i, 1, action?.txn)
  
            }
          } )
          state[action?.txn?.id] = action?.txn
          newState = {...state, completed:[...state?.completed], incomplete:[...state?.incomplete],target:[...state?.target]}
          return newState
      
      case SET_TARGET:
        newState = {...state, completed:[...state?.completed], incomplete:[...state?.incomplete],target:[action.txn]}
          return newState


      
        

    default:
      return state;
  }
}
