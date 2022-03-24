import { Link } from "react-router-dom";

const QuoteItem = ({ id, text, author }) => {
  return (
    <div>
      <div>{text}</div>
      <div>{author}</div>
      <div>
        <Link to={`/quotes/${id}`}>View Full Screen</Link>
      </div>
    </div>
  );
};

export default QuoteItem;
