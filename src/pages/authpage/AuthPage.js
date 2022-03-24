import React from "react";

const AuthPage = () => {
  return (
    <div>
      <form>
        <h1>Login</h1>

        <div>
          <label>Your Email</label>
          <input type="email" name="email" id="" />
        </div>
        <div>
          <label>Your Email</label>
          <input type="email" name="email" id="" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <span>Create new account</span>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
