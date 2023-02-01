import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/InboxStore";
import { objActions } from "../store/ObjStore";
import { useEffect, Fragment } from "react";
import classes from "./MailInbox.module.css";
const Sent = () => {
  const history = useHistory();

  const loggedEmail = useSelector((currState) => currState.auth.email);
  const dispatch = useDispatch();
  const sentbox = useSelector((currState) => currState.array.sentbox);

  const getSentData = async () => {
    const sentMail = await fetch(
      `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/sent.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await sentMail.json();
    console.log(data);
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
  };
  useEffect(() => {
    getSentData();
  }, []);

  const sentMailReadFetching = (mail) => {
    const updatedData = async (mail) => {
      try {
        const response = await fetch(
          `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/sent/${mail.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              ...mail,
              read: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data) {
        }
      } catch (error) {
        console.log(error);
      }
    };
    updatedData(mail);
  };

  const openSentMailHandler = (obj) => {
    dispatch(objActions.objHandler(obj));
    dispatch(inboxActions.inboxMailRead(obj));

    const mail = sentbox.find((mail) => {
      return mail.id === obj.id;
    });
    sentMailReadFetching(mail);
    history.replace("/MailDetail");
  };

  const deleteSentMailHandler = async (obj) => {
    try {
      const delSentMail = await fetch(
        `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/sent/${obj.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await delSentMail.json();
      getSentData();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center">SENT</h1>
      <ul>
        {sentbox.map((obj) => (
          <div className={classes.email} key={obj.id}>
            <table className="table">
              <tbody>
                <tr>
                  <td>{obj.email}</td>
                  <td onClick={openSentMailHandler.bind(null, obj)}>
                    {obj.text}
                  </td>
                  <td>{!!obj.read ? "read" : <b>"Unread"</b>}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={deleteSentMailHandler.bind(null, obj)}
                    >
                      del
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </ul>
    </Fragment>
  );
};

export default Sent;
