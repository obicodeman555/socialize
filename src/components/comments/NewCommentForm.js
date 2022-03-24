import React, { useRef, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { addComment } from "../../lib/api";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  //trigger on dependencies values changes
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  //submit comment
  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;
    sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId });
  };
  return (
    <form onSubmit={submitFormHandler}>
      {status === "pending" && <div>Loading...</div>}
      <div>
        <label htmlFor="">Your Comment</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          ref={commentTextRef}
        ></textarea>
      </div>
      <div>
        <button className="">Add a comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
