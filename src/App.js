import "./App.css";
import SignIn from "./components/SignIn";
import { Fragment } from "react";
import DummyScreen from "./components/DummyScreen";
import { Route } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Route path="/DummyScreen" exact>
        <DummyScreen />
      </Route>
      <Route path="/" exact>
        <SignIn />
      </Route>
    </Fragment>
  );
}

export default App;
