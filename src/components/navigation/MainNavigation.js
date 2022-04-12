import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./mainnav.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

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
          {isLoggedIn && (
            <NavLink
              to="/new-quote"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Add a Quote
            </NavLink>
          )}
        </li>
        <li>
          {!isLoggedIn && (
            <NavLink
              to="/auth"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Login
            </NavLink>
          )}
        </li>
        <li>{isLoggedIn && <button onClick={logoutHandler}>Logout</button>}</li>
        <li>
          {isLoggedIn && (
            <NavLink
              to="/settings"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Settings
            </NavLink>
          )}
        </li>
      </ul>
    </header>
  );
};

export default MainNavigation;
