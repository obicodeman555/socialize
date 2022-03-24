import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

import useHttp from "../hooks/useHttp";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {
  const params = useParams();

  const {
    sendRequest,
    data: loadedQuote,
    error,
    status,
  } = useHttp(getSingleQuote, true);

  //destructure params
  const { quoteId } = params;

  //send request
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  //show loader for pending status
  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  //check if text is undefined or no text
  if (!loadedQuote.text) {
    return <p>No Quote Found!!!</p>;
  }
  return (
    <>
      <div>
        <p>{loadedQuote.text}</p>
        <p>{loadedQuote.author}</p>
      </div>
      <Outlet />
    </>
  );
};

export default QuoteDetail;
