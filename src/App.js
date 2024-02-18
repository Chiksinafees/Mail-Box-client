import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import Header from "./components/pages/Header";
import { useSelector } from "react-redux";
import useMail from "./hooks/use-Mail";
import mail from "../src/assets/mail.jpg";
import Footer from "./components/pages/Footer";

const SendMail = React.lazy(() => import("./components/pages/SendMail"));
const MailInbox = React.lazy(() => import("./components/pages/MailInbox"));
const MailDetail = React.lazy(() => import("./components/pages/MailDetail"));
const Sent = React.lazy(() => import("./components/pages/Sent"));
const DummyScreen = React.lazy(() => import("./components/pages/DummyScreen"));
const ForgotPassword = React.lazy(() =>
  import("./components/pages/ForgotPassword")
);


function App() {
  const isloggedIn = useSelector((currState) => currState.auth.isloggedIn);

  useMail(true);
  useMail(false);

  return (
    <div
      style={{
        backgroundImage: `url(${mail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Header />
      <br />
      {!isloggedIn && (
        <Route path="/" exact>
          <SignIn />
        </Route>
      )}
      <Suspense fallback={<h1>Loading...</h1>}>
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
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
