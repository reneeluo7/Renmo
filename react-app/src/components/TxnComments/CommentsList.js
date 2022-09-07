import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInitials, getUserFullName } from "../../util/nameconvert";
import { deleteComment } from "../../store/comment";
import EditComment from "./EditComment";

export default function CommentsList({ comments }) {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.session?.user);
//   const [content, setContent] = useState("");
//   const [edit, setEdit] = useState(false);

  return (
    <div>
      {comments &&
        comments?.map((cmt) => (
          <div className="txn-bar-left" key={cmt.id}>
            <div className="txn-bar-initial">{getUserInitials(cmt.user)}</div>
            <div className="txn-bar-info">
              <div className="topline">{getUserFullName(cmt.user)}</div>
              <EditComment cmt={cmt} />
              
            </div>
          </div>
        ))}
    </div>
  );
}
