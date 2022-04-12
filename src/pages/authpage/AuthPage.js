import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import AuthContext from "../../store/auth-context";
import "./auth-page.scss";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  //getting input values
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  let url;

  const switchAutoModeHandler = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  //triggered when user submit form
  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA56nPEeiiK_I8_ZF-6IilnzSlCldhK7RI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA56nPEeiiK_I8_ZF-6IilnzSlCldhK7RI";
    }
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!!";

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        authCtx.login(data.idToken, data.expiresIn);
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <section className="authentication">
      <form onSubmit={submitHandler}>
        <h1>{isLogin ? "Login to your account" : "Welcome new member!"}</h1>

        <div className="form__control">
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div className="form__control">
          <label htmlFor="password">Your password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="cta__buttons">
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <Loading />}
          <button type="button" onClick={switchAutoModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthPage;
