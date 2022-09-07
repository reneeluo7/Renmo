import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comment";

function CreateComment({ txn }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.session.user);
  const txnId = txn.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length > 150) {
      setErrors({ comment: ["Maximum comment length is 150 characters"] });
      return;
    }
    if (!content) {
      setErrors({ comment: ["Comment cannot be empty"] });
      return;
    }

    const newComment = {
      content,
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
      <form onSubmit={handleSubmit}>
        <input
          placeholder="add your comment here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button>Post</button>
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
