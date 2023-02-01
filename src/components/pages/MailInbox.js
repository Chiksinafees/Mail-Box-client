import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/InboxStore";
import { useHistory } from "react-router-dom";
import { objActions } from "../store/ObjStore";
import classes from "./MailInbox.module.css";

const MailInbox = () => {
  const history = useHistory();

  const loggedEmail = useSelector((currState) => currState.auth.email);
  const dispatch = useDispatch();
  const inbox = useSelector((currState) => currState.array.inbox);

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
  };
  useEffect(() => {
    getdata();
  }, []);

  const inboxMailReadFetching = (mail) => {
    const updateData = async (mail) => {
      try {
        const response = await fetch(
          `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/inbox/${mail.id}.json`,
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
      } catch (error) {
        console.log(error);
      }
    };
    updateData(mail);
  };

  const openMailHandler = (obj) => {
    dispatch(objActions.objHandler(obj));
    dispatch(inboxActions.inboxMailRead(obj));

    const mail = inbox.find((mail) => {
      return mail.id === obj.id;
    });
    inboxMailReadFetching(mail);
    history.replace("/MailDetail");
  };

  const deleteHandler = async (obj) => {
    
    try {
      const del = await fetch(
        `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/inbox/${obj.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await del.json();
      getdata();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center">INBOX</h1>
      <ul>
        {inbox.map((obj) => (
          <div className={classes.email} key={obj.id}>
            <table className="table">
              <tbody>
                <tr>
                  <td>{obj.email}</td>
                  <td onClick={openMailHandler.bind(null, obj)}>{obj.text}</td>
                  <td>{!!obj.read ? "read" : <b>"Unread"</b>}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={deleteHandler.bind(null, obj)}
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

export default MailInbox;
