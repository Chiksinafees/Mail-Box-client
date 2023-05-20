import React, { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

const SendMail = () => {
  const history = useHistory();
  const currEmail = useSelector((currState) => currState.auth.email);

  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // const editor = useRef(null);

  const sendEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const editorStateChangeHandler = (editorState) => {
    setEditorState(editorState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const obj = {
      email: email,
      text: text,
    };
    const message = editorState.getCurrentContent().getPlainText();

    const regex = /[.@]/g;
    const emailId = obj.email.replace(regex, "");

    const postData = async () => {
      const sent = await fetch(
        `https://mail-box-b419a-default-rtdb.firebaseio.com/${currEmail}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            text: message,
            read: false,
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
            text: message,
            read: false,
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
    setEditorState(() => EditorState.createEmpty());
    history.replace("/Sent");
  };

  return (
    <div className="mb-10">
      <h1 className="text-center text-5xl font-bold mb-4 text-white font-serif">
        COMPOSE
      </h1>
      <form
        onSubmit={submitHandler}
        className="max-w-lg mx-auto bg-slate-950 rounded-lg shadow-md p-6"
      >
        <div>
          <p className="text-gray-300 text-bold">From: {currEmail}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="to" className="text-gray-300">
            To:
          </label>
          <input
            type="email"
            id="to"
            placeholder="Example@gmail.com"
            value={email}
            onChange={sendEmailHandler}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full text-gray-800"
          />
        </div>
        <div className="mt-6 ">
          <label htmlFor="text" className="text-gray-600 mb-2">
            Compose email:
          </label>
          <Editor
            editorState={editorState}
            wrapperClassName="flex flex-col-reverse bg-white  rounded-lg"
            editorClassName="border border-gray-300 bg-white pb-28 mb-4 pt-2 px-2 focus:outline-none text-slate-950  rounded-lg"
            toolbarClassName="flex flex-row flex-wrap justify-between toolbar px-3 pb-2 py-1 bold"
            onEditorStateChange={editorStateChangeHandler}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-lime-300 to-lime-950 text-white rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
