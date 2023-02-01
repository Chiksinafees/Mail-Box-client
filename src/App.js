import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import { Fragment } from "react";
import DummyScreen from "./components/pages/DummyScreen";
import { Route } from "react-router-dom";
import SendMail from "./components/pages/SendMail";
import Header from "./components/pages/Header";
import MailInbox from "./components/pages/MailInbox";
import { useSelector } from "react-redux";
import MailDetail from "./components/pages/MailDetail";
import ForgotPassword from "./components/pages/ForgotPassword";
import Sent from "./components/pages/Sent";

function App() {
  
  const isloggedIn = useSelector((currState) => currState.auth.isloggedIn);

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
