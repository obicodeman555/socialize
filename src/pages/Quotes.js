import { useEffect } from "react";
import QuoteList from "../components/QuoteList";
import useHttp from "../hooks/useHttp";
import { getAllQuotes } from "../lib/api";

const Quotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  //side effect to fetch data
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if ((status === "completed") & (!loadedQuotes || loadedQuotes.length === 0)) {
    return;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default Quotes;
