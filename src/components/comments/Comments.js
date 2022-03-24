import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/useHttp";
import { getAllComments } from "../../lib/api";
import CommentList from "./CommentList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => setIsAddingComment(true);

  //useCallback to prevent function recreated when component
  //is re-valuated
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
    // navigate(`${quoteId}/comments`, { replace: true });
  }, [sendRequest, quoteId]);

  //comment jsx
  let comments;

  //handling data if pending
  if (status === "pending") {
    comments = <div>Loading...</div>;
  }

  //handling data if completed and return a data
  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentList comments={loadedComments} />;
  }

  //handlng data if completed and there is no data
  if (
    status === "completed" &&
    !loadedComments &&
    loadedComments.length === 0
  ) {
    comments = <p>No Comments were added yet</p>;
  }

  return (
    <section>
      <h1>User Comments</h1>
      {!isAddingComment && (
        <button onClick={startAddCommentHandler}>Add a comment</button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}

      {comments}
    </section>
  );
};

export default Comments;
