import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInitials, getUserFullName } from "../../util/nameconvert";
import { deleteComment } from "../../store/comment";

export default function CommentsList({ comments }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {comments &&
        comments?.map((cmt) => (
          <div className="txn-bar-left" key={cmt.id}>
            <div className="txn-bar-initial">{getUserInitials(cmt.user)}</div>
            <div className="txn-bar-info">
              <div className="topline">{getUserFullName(cmt.user)}</div>
              {!edit && (
                <div className="third-txn-note-line edit-delete-line">
                  <div className="comment-content">{cmt.content}</div>
                  {user.id == cmt.user.id && (
                    <div className="edit-delete-btns">
                      <button
                        className="comment-edit-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setEdit(true)
                          setContent(`${cmt.cont}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="comment-delete-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteComment(cmt.id));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
              {edit && (
                <div className="edit-note-input">
                  <input
                    type="text"
                    value={content}
                    id="edit-note"
                    onChange={(e) => setContent(e.target.value)}
                    cols="40"
                    rows="4"
                  />
                  <button className="submit-edit-note">Post</button>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
