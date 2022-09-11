import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comment";
import { getUserInitials, getUserFullName } from "../../util/nameconvert";

function CreateComment({ txn }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.session.user);
  const txnId = txn.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim().length > 150) {
      setErrors({ comment: ["Maximum comment length is 150 characters"] });
      return;
    }
    if (!content.trim()) {
      setErrors({ comment: ["Comment cannot be empty"] });
      return;
    }

    const newComment = {
      content:content.trim(),
    };
    // console.log("----newComment and txnId dispatch to thunk", newComment, txnId );
    const data = await dispatch(createComment(newComment, txnId));
    // console.log("----data return from thunk", data);
    if (data) {
      setErrors(data);
    } else {
      setErrors({});
      setContent("");
    }
  };

  return (
    <>
    {/* <div className=" create-comment-user">{getUserInitials(user)}</div> */}
      <form 
        className="create-comment-form"
        onSubmit={handleSubmit}>
        <input
          className="create-comment-input"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setErrors({})}
        ></input>
        <button className="create-comment-sub-btn">Post</button>
      </form>
      {errors.comment && (
        <div className="error" style={{ color: "red" }}>
          {errors?.comment?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      )}
    </>
  );
}

export default CreateComment;
