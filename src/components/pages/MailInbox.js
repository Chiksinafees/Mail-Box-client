import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/InboxStore";

const MailInbox = () => {
  const loggedEmail = useSelector((currState) => currState.auth.email);
  const dispatch = useDispatch();
  const inbox = useSelector((currState) => currState.array.inbox);

  console.log(inbox);
  const getdata = async () => {
    const get = await fetch(
      `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/inbox.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await get.json();
    console.log(data);
    let newArray = [];
    if (!!data) {
      newArray = Object.keys(data).map((mail) => {
        return {
          id: mail,
          email: data[mail].email,
          text: data[mail].text,
        };
      });
      console.log(newArray);
      dispatch(
        inboxActions.inboxHandler({
          newArray: newArray,
        })
      );
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <Fragment>
      <ul>
        {inbox.map((arr) => (
          <li key={arr.id}>
            email : {arr.email} , text: {arr.text}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default MailInbox;
