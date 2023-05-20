import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../components/store/InboxStore";

const useMail = (sent = true) => {
  const loggedEmail = useSelector((currState) => currState.auth.email);
  const dispatch = useDispatch();

  let url;
  if (sent) {
    url = `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/sent.json`;
  } else {
    url = `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/inbox.json`;
  }

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (sent) {
        let newArray2 = [];
        if (!!data) {
          newArray2 = Object.keys(data).map((mail) => {
            return {
              id: mail,
              email: data[mail].email,
              text: data[mail].text,
              read: data[mail].read,
            };
          });
          dispatch(
            inboxActions.sentHandler({
              newArray2: newArray2,
            })
          );
          dispatch(inboxActions.sentMailRead(newArray2));
        }
      } else {
        let newArray = [];
        if (!!data) {
          newArray = Object.keys(data).map((mail) => {
            return {
              id: mail,
              email: data[mail].email,
              text: data[mail].text,
              read: data[mail].read,
            };
          });
          dispatch(
            inboxActions.inboxHandler({
              newArray: newArray,
            })
          );
          dispatch(inboxActions.inboxMailRead(newArray));
        }
      }
    })
    .catch((error) => console.error(error));
};

export default useMail;
