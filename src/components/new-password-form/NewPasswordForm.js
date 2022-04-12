import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
const NewPasswordForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA56nPEeiiK_I8_ZF-6IilnzSlCldhK7RI",
      {
        method: "POST",
        body: JSON.stringify({
          password: enteredNewPassword,
          idToken: authCtx.token,
          returnSecureToken: false,
        }),
        header: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      navigate("/");
    });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <h3>Provide a new password of your choice</h3>
        <div>
          <label>New Password</label>
          <input type="password" ref={newPasswordInputRef} minLength="7" />
        </div>
        <div>
          <button>Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordForm;
