import { Link } from "react-router-dom";
import "./quoteItem.scss";


const QuoteItem = ({ id, text, author }) => {
  return (
    <div>
      <div className="text">{text}</div>
      <div>{author}</div>
      <div>
        <Link to={`/quotes/${id}`}>View Full Screen</Link>
      </div>
    </div>
  );
};

export default QuoteItem;
