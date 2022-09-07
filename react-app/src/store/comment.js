const LOAD = "comments/LOAD_COMMENTS";
const CREATE = "comments/CREATE_COMMENT";
const DELETE = "comments/DELETE_COMMENT";
const UPDATE = "comments/UPDATE_COMMENT";

//action
const loadComments = (comments) => ({
  type: LOAD,
  comments,
});

const addCom = (com) => ({
  type: CREATE,
  com,
});

const remove = (id) => ({
  type: DELETE,
  id,
});

const update = (cmt) => ({
  type: UPDATE,
  cmt,
});

//thunk
// GET
export const getCommentByTxn = (txnId) => async (dispatch) => {
  const response = await fetch(`/api/comments/transactions/${txnId}`);
  console.log("---response in thunk", response);
  if (response.ok) {
    const data = await response.json();
    console.log("---console log in thunk fetch from backend data", data);
    dispatch(loadComments(data.comments));
    return response;
  }
};

//POST
export const createComment = (data, txnId) => async (dispatch) => {
  const response = await fetch(`/api/comments/transactions/${txnId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(".....response in thunk from backend", response);
  if (response.ok) {
    const data = await response.json();

    dispatch(addCom(data.comment));
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
export const deleteComment = (cmtId) => async (dispatch) => {
    
  const response = await fetch(`/api/comments/${cmtId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  if (response.ok) {
    await dispatch(remove(cmtId));
  }
  return data;
};

// PUT
export const editComment = (cmt, cmtId) => async (dispatch) => {
    
  const response = await fetch(`/api/comments/${cmtId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmt)
  });
  
  if (response.ok) {
    const data = await response.json();
    await dispatch(update(data.comment));
    
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

//reducer
const initialState = { comment: [] };
const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = { ...state, comment: [...action?.comments] };
      action?.comments?.forEach((com) => {
        newState[com.id] = com;
      });
      return newState;

    case CREATE:
      newState = { ...state, comment: [...state.comment, action.com] };
      newState[action.com.id] = action.com;
      return newState;

    case UPDATE:
      state?.comment?.forEach((cmt,i) => {
        if (cmt.id === action.cmt.id) {
          state.comment?.splice(i, 1, action.cmt)
        }
      })
      newState = { ...state, comment: [...state.comment] };
      newState[action.cmt.id] = action.cmt;
      return newState;

    case DELETE:
      delete state[action.id];
      const newComments = state.comment.filter((cmt) => cmt.id !== action.id);
      newState = {
        ...state,
        comment: [...newComments],
      };

      return newState;

    default:
      return state;
  }
};

export default reducer;
