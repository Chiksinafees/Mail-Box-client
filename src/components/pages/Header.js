import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { mailActions } from "../store/MailStore";
import { useHistory } from "react-router-dom";

const Header = () => {

    const dispatch = useDispatch();
    const history = useHistory();
  
    const logoutHandler = () => {
      dispatch(mailActions.logout());
      history.replace("/");
    };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <h1>Mail Box </h1>
      <Button
        className="btn btn-warning btn-lg float-right"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </nav>
  );
};

export default Header;
