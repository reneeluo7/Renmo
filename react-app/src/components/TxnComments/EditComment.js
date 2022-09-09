import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../store/comment";


export default function EditComment({ cmt }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim().length > 150) {
        setErrors({ comment: ["Maximum comment length is 150 characters"] });
        return;
      }
      if (!content) {
        setErrors({ comment: ["Comment cannot be empty"] });
        return;
      }
      const editedComment = {
        content:content.trim()
      };
      console.log("edited comment after trim()", editedComment)

      const data = await dispatch(editComment(editedComment, cmt.id));
      if (data) {
        setErrors(data);
      } else {
        setErrors({});
        setEdit(false)
      }

  }

  return (
    <div>
      {!edit && (
        <div className="third-txn-note-line edit-delete-line">
          <div className="comment-content">{cmt.content}</div>
          {user.id == cmt.user.id && (
            <div className="edit-delete-btns">
              <button
                className="comment-edit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(true);
                  setContent(`${cmt.content}`);
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={content}
              id="edit-note"
              onChange={(e) => setContent(e.target.value)}
              cols="80"
              rows="4"
            />
            <button className="submit-edit-note" type="submit">Post</button>
          </form>
        </div>
      )}
      <div style={{ color: "red" }} className="errors-show">
            {errors && errors.comment?.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
    </div>
  );
}
