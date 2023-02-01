import { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
    
  const history = useHistory();

  const [emailReset, setEmailReset] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetEmailHndler = (e) => {
    setEmailReset(e.target.value);
  };

  const resetFormHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const passwordReset = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAMozuEZUjXrg093LJiPP24vzM18K9yKVg",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailReset,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await passwordReset.json();
    setIsLoading(false);
    if (passwordReset.ok) {
      console.log(data);
    } else {
      alert(data.error.message);
    }
  };

  const redirectLoginPage = () => {
    history.replace("/");
  };

  return (
    <section className={classes.verify}>
      <form onSubmit={resetFormHandler}>
        <h4>reset your password</h4>
        <div className={classes.control}>
          <input
            id="email"
            type="email"
            placeholder="resetPassword@gmail.com"
            value={emailReset}
            onChange={resetEmailHndler}
            required
          />
        </div>
        <br />
        {!isLoading && <button type="submit">send link</button>}
        <p type="button" onClick={redirectLoginPage}>
          already a user? Login
        </p>
        {isLoading && <p>sending request...</p>}
      </form>
    </section>
  );
};

export default ForgotPassword;
