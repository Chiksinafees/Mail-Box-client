import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import { Fragment } from "react";
import DummyScreen from "./components/pages/DummyScreen";
import { Route } from "react-router-dom";
import SendMail from "./components/pages/SendMail";
import Header from "./components/pages/Header";

function App() {
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
      <Route path="/SendMail" exact>
        <SendMail />
      </Route>
    </Fragment>
  );
}

export default App;
