import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import "./quoteDetails.scss";
import useHttp from "../hooks/useHttp";
import { getSingleQuote } from "../lib/api";
import Loading from "../components/loading/Loading";

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
    return <Loading />;
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
      <div className="single__quote">
        <span>{loadedQuote.text}</span>
        <span>{loadedQuote.author}</span>
      </div>
      <Outlet />
    </>
  );
};

export default QuoteDetail;
