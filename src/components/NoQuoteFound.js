import React from "react";
import { Link } from "react-router-dom";

const NoQuoteFound = () => {
  return (
    <div>
      <h1>No Quotes Found</h1>
      <Link to="/new-quote">Add Quote</Link>
    </div>
  );
};

export default NoQuoteFound;
