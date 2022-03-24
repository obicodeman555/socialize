import { NavLink } from "react-router-dom";
import "./mainnav.css";

const MainNavigation = () => {
  return (
    <header>
      <h1>Great Quotes </h1>
      <ul>
        <li>
          <NavLink
            to="/quotes"
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            All Quotes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/new-quote"
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            Add a Quote
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default MainNavigation;
