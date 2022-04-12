import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

//helper function calculating the reaining time for
//token to expire
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  // console.log(currentTime);
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  // const navigate = useNavigate();

  const userIsLoggedIn = !!token;

  //log out
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    // navigate("/auth");
  };

  //login
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);

    const timeLeft = calculateRemainingTime(expirationTime);

    //logout when timeLeft is completed
    setTimeout(logoutHandler, timeLeft);
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
