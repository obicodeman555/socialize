import React from "react";

const NewPasswordForm = () => {
  return (
    <div>
      <form>
        <h3>Provide a new password of your choice</h3>
        <div>
          <label>New Password</label>
          <input type="password" />
        </div>
      </form>
    </div>
  );
};

export default NewPasswordForm;
