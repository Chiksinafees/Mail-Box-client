import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
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
    <Container className="flex justify-center items-center h-screen text-white">
      <Form
        onSubmit={submitHandler}
        className="bg-gradient-to-r from-black to-gray-700 shadow-md rounded px-16 pt-6 pb-8 mb-4"
      >
        <h1 className="text-2xl mb-4 text-center">
          {login ? "Login" : "Sign up"}
        </h1>
        <div className="mb-4">
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Example@gmail.com"
              value={email}
              onChange={emailHandler}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </Form.Group>
        </div>
        <Button
          variant="secondary"
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {login ? "Login" : "Sign up"}
        </Button>
        <p
          onClick={ForgotPasswordHandler}
          className="text-sm text-gray-100 hover:text-gray-400 cursor-pointer mt-4"
        >
          Forgot Password? Reset
        </p>
        <h4
          type="button"
          onClick={switchAuthHandler}
          className="text-sm text-gray-100 hover:text-gray-400 cursor-pointer mt-4"
        >
          {login
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </h4>
      </Form>
    </Container>
  );
};

export default SignIn;
