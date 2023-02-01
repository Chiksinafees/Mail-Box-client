import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import classes from "./SignIn.module.css";
import { useDispatch } from "react-redux";
import { mailActions } from "./store/MailStore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setlogin] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      password.length <= 8 &&
      confirmPassword.length <= 8 &&
      password === confirmPassword
    ) {
      let url;
      if (login) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMozuEZUjXrg093LJiPP24vzM18K9yKVg";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMozuEZUjXrg093LJiPP24vzM18K9yKVg";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              if (data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          if (login) {
            console.log(data.idToken);
            const regex = /[.@]/g;
            const emailId = data.email.replace(regex, "");

            dispatch(
              mailActions.login({
                email: emailId,
                token: data.idToken,
              })
            );
            history.replace("/MailInbox");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      if (password !== confirmPassword) {
        alert("password and confirm password did not match");
      } else if (password.length <= 8 && confirmPassword.length <= 8) {
        alert("please enter atleast 8 digit");
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const switchAuthHandler = () => {
    setlogin((prevState) => !prevState);
  };

  const ForgotPasswordHandler = () => {
    history.replace("/ForgotPassword");
  };
  return (
    <Container className={classes.box}>
      <Form onSubmit={submitHandler}>
        <h1>{login ? "Login" : "Sign up"}</h1>
        <div>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Example@gmail.com"
              value={email}
              onChange={emailHandler}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password::</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={passwordHandler}
              required
            />
          </Form.Group>
          <Form.Group controlId="confirm password">
            <Form.Label>Confirm password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={confirmPasswordHandler}
              required
            />
          </Form.Group>
        </div>
        <Button variant="secondary" type="submit">
          {login ? "Login" : "Sign up"}
        </Button>
        <p onClick={ForgotPasswordHandler}>Forgot Password? Reset</p>
        <h4 type="button" onClick={switchAuthHandler}>
          {login
            ? "Don't have an account?sign up"
            : "already have an account? login"}
        </h4>
      </Form>
    </Container>
  );
};

export default SignIn;
