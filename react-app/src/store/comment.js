
const CREATE= 'comments/CREATE_COMMENT'

//action
const addCom = (com) => ({
    type: CREATE,
    com
})


//thunk
export const createComment = (data, txnId) => async (dispatch) => {

    const response = await fetch(`/api/comments/transactions/${txnId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const newnote = await response.json();
    dispatch(create(newnote));
    return newnote
};


//reducer

const comments = (state={}, action) => {
    let newState;
    switch(action.type) {
        default:
            return state;
    }
}