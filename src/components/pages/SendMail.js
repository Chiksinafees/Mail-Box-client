import React, { Fragment, useRef } from "react";
import { useState } from "react";
import JoditEditor from "jodit-react";
import classes from "./SendMail.module.css";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const SendMail = () => {

  const currEmail = useSelector((currState) => currState.auth.email);

  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const editor = useRef(null);

  const sendEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      email: email,
      text: text,
    };
    const regex = /[.@]/g;
    const emailId = obj.email.replace(regex, "");

    const postData = async () => {
      const sent = await fetch(
        `https://mail-box-b419a-default-rtdb.firebaseio.com/${currEmail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            text: text,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await sent.json();
      console.log(data);

      const inbox = await fetch(
        `https://mail-box-b419a-default-rtdb.firebaseio.com/${emailId}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            email: currEmail,
            text: text,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data2 = await inbox.json();
      console.log(data2);
    };
    postData();
    setEmail("");
    setText("");
  };
  return (
    <Fragment>
      <h1 style={{ textAlign: "center" }}>SEND EMAIL:</h1>
      <Form onSubmit={submitHandler} className={classes.box}>
        <div>
          <p>From: {currEmail}</p>
        </div>
        <div>
          <Form.Group controlId="To">
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Example@gmail.com"
              value={email}
              onChange={sendEmailHandler}
              required
            />
          </Form.Group>
        </div>
        <br />
        <div>
          <label htmlFor="text ">Compose email:</label>
          <JoditEditor
            ref={editor}
            value={text}
            onChange={(newText) => setText(newText)}
          />
        </div>
        <br />
        <div>
          <Button type="submit">Send</Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SendMail;
