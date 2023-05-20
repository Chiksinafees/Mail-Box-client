import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/InboxStore";
import { objActions } from "../store/ObjStore";
import { useState, useEffect, Fragment } from "react";

const Sent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const loggedEmail = useSelector((currState) => currState.auth.email);
  const sentbox = useSelector((currState) => currState.array.sentbox);

  const getSentData = async () => {
    setIsloading(true);
    const get = await fetch(
      `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/sent.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await get.json();
    // console.log(data);
    let newArray2 = [];
    if (!!data) {
      setIsloading(false);
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
    const updateData = async (mail) => {
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
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    updateData(mail);
  };

  const openSentMailHandler = (obj) => {
    dispatch(objActions.objHandler(obj));
    dispatch(inboxActions.sentMailRead(obj));

    const mail = sentbox.find((mail) => {
      return mail.id === obj.id;
    });
    sentMailReadFetching(mail);
    history.replace("/MailDetail");
  };

  const deleteSentMailHandler = async (obj) => {
    try {
      const del = await fetch(
        `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/sent/${obj.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await del.json();
      getSentData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="my-24">
      <h1 className="text-center text-white text-5xl font-bold my-10 font-serif">
        SENT
      </h1>
      <ul>
        {isLoading && (
          <div className="text-center my-10">
            <svg
              className="animate-spin h-12 w-12 text-yellow-400 mx-auto"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016 12H2c0 3.042 1.135 5.824 3 7.938l-.002-.001zm5.003-1.162A5.965 5.965 0 0012 13c1.215 0 2.343.358 3.303.975L11.003 16.13zm4.497-2.846A7.962 7.962 0 0018 12h-4c0 2.18-.882 4.154-2.317 5.591l.002-.002z"
              ></path>
            </svg>
          </div>
        )}
        {sentbox.map((obj) => (
          <div
            className="flex flex-wrap sm:px-3 bg-slate-950 hover:bg-slate-900 shadow-md rounded-lg p-4 mb-1 mx-2 sm:mx-2 md:mx-2 lg:mx-2 xl:mx-10"
            key={obj.id}
          >
            <div
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 cursor-pointer"
              onClick={openSentMailHandler.bind(null, obj)}
            >
              <span className="block text-lg font-medium text-white truncate">
                {obj.email}
              </span>
              <span className="block text-gray-400 text-base truncate line-clamp-1">
                {obj.text}
              </span>
            </div>
            <div
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center cursor-pointer"
              onClick={openSentMailHandler.bind(null, obj)}
            >
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  obj.read
                    ? "bg-green-300 text-green-900"
                    : "bg-red-300 text-red-900"
                }`}
              >
                {!!obj.read ? "Read" : "Unread"}
              </span>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 flex justify-end items-center">
              <button
                className="text-white font-bold py-2 px-4 rounded-md bg-gradient-to-r from-slate-900 to-yellow-600 transition-colors custom-button"
                onClick={deleteSentMailHandler.bind(null, obj)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sent;
