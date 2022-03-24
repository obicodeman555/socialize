import QuoteItem from "../components/QuoteItem";
import { useNavigate, useLocation } from "react-router-dom";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((a, b) => {
    if (ascending) {
      return a.id > b.id ? 1 : -1;
    } else {
      return a.id < b.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  //check if we are on ascending sorting
  const isSortAscending = queryParams.get("sort") === "asc";

  //sorted Quotes
  const sortedQuotes = sortQuotes(props.quotes, isSortAscending);

  const changeSortingHandler = () => {
    navigate(`/quotes?sort=${isSortAscending ? "desc" : "asc"}`, {
      replace: true,
    });
  };

  return (
    <>
      <div>
        <button onClick={changeSortingHandler}>
          Sort {isSortAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      {sortedQuotes.map((quote) => (
        <QuoteItem
          key={quote.id}
          id={quote.id}
          text={quote.text}
          author={quote.author}
        />
      ))}
    </>
  );
};

export default QuoteList;
