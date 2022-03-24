import React from "react";
import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem text={comment.text} key={comment.id} />
      ))}
    </>
  );
};

export default CommentList;
