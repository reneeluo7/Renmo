// constants
const LOAD_COMPLETED = "transactions/GET_ALL_COMPLETED_TXNS";
const LOAD_INCOMPLETE = "transactions/GET_ALL_INCOMPLETE_TXNS";
const ADD_NEW_TXN = "transactions/ADD_NEW_TXN";
const CANCEL_TXN = "transactions/CANCEL_TXN";

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
    return response;
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
const initialState = { completed: [], incomplete: [] };
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_COMPLETED:
      newState = {
        ...state,
        completed: [...action.transactions],
        incomplete: [...state?.incomplete],
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
      };
      
      return newState;


    case ADD_NEW_TXN:
      if (action.txn.pending === true) {
        newState = {
          ...state,
          completed: [...state?.completed],
          incomplete: [...state?.incomplete, action.txn],
        };
      } else
        newState = {
          ...state,
          completed: [...state?.completed, action.txn],
          incomplete: [...state?.incomplete],
        };

      newState[action.txn.id] = action.txn;
      return newState;

    default:
      return state;
  }
}
