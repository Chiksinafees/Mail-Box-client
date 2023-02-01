import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import { Fragment,useEffect } from "react";
import DummyScreen from "./components/pages/DummyScreen";
import { Route } from "react-router-dom";
import SendMail from "./components/pages/SendMail";
import Header from "./components/pages/Header";
import MailInbox from "./components/pages/MailInbox";
import { useSelector,useDispatch } from "react-redux";
import MailDetail from "./components/pages/MailDetail";
import ForgotPassword from "./components/pages/ForgotPassword";
import Sent from "./components/pages/Sent";
import { inboxActions } from "./components/store/InboxStore";

function App() {
  
  const isloggedIn = useSelector((currState) => currState.auth.isloggedIn);
  const loggedEmail = useSelector((currState) => currState.auth.email);
  const dispatch=useDispatch()
  
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
      dispatch(inboxActions.sentHandler({
          newArray2: newArray2,
        })
      );
      dispatch(inboxActions.sentMailRead(newArray2));
    }
  };

  useEffect(() => {
    getSentData();
  }, []);

  
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
    //console.log(data);
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
    setInterval(() => {
      getdata();
    }, 2000);
  }, []);


  return (
    <Fragment>
      <Header />
      <br />
      <Route path="/" exact>
        <SignIn />
      </Route>
      <Route path="/DummyScreen" exact>
        <DummyScreen />
      </Route>
      {isloggedIn && (
        <Route path="/SendMail" exact>
          <SendMail />
        </Route>
      )}
      {isloggedIn && (
        <Route path="/MailInbox" exact>
          <MailInbox />
        </Route>
      )}
      {isloggedIn && (
        <Route path="/MailDetail" exact>
          <MailDetail />
        </Route>
      )}
      {isloggedIn && (
        <Route path="/Sent" exact>
          <Sent />
        </Route>
      )}
      <Route path="/ForgotPassword" exact>
        <ForgotPassword />
      </Route>
    </Fragment>
  );
}

export default App;
