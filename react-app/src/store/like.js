const LOAD = "likes/LOAD_LIKES";



//action
const loadLikes = (likes) => ({
  type: LOAD,
  likes,
});




//thunk
// GET
export const getLikesByTxn = (txnId) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${txnId}`);
  
  if (response.ok) {
    const data = await response.json();
    
    dispatch(loadLikes(data.likes));
    return response;
  }
};

//PUT
export const likeTxn = ( txnId) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${txnId}/like`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
   
  });
 
  if (response.ok) {
    const data = await response.json();

    dispatch(loadLikes(data.likes));
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

// DELETE
export const unlikeTxn = (txnId) => async (dispatch) => {
    
  const response = await fetch(`/api/transactions/${txnId}/like`, {
    method: "DELETE",
  });
  const data = await response.json();

  if (response.ok) {
    await dispatch(loadLikes(data.likes));
  }
  return data;
};


//reducer
const initialState = { likes: [] };
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
    
      newState = { ...state, likes: [...action?.likes] };
      action?.likes?.forEach((id) => {
        newState[id] = id;
      });
      return newState;

    default:
      return state;
  }
};

export default reducer;
