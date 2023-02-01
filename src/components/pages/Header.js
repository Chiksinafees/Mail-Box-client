import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/MailStore";
import { useHistory } from "react-router-dom";

const Header = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const isloggedIn = useSelector((currState) => currState.auth.isloggedIn);

  const inbox = useSelector((currState) => currState.array.inbox);
  const sentbox = useSelector((currState) => currState.array.sentbox);


  const extractInboxValue = (inbox, read) => {
    let extractedInboxValue = inbox.map((mail) => mail[read]);
    return extractedInboxValue;
  };
  let totalInboxUnread = 0;
  const unreadInboxMail = extractInboxValue(inbox, "read");
  unreadInboxMail.forEach((v) => (v ? v : totalInboxUnread++));


  const extractSentValue = (sentbox, read) => {
    let extractedSentValue = sentbox.map((mail) => mail[read]);
    return extractedSentValue;
  };
  let totalSentUnread = 0;
  const unreadSentMail = extractSentValue(sentbox, "read");
  unreadSentMail.forEach((v) => (v ? v : totalSentUnread++));

  
  const logoutHandler = () => {
    dispatch(mailActions.logout());
    history.replace("/");
  };

  const inboxHandler = () => {
    history.replace("/MailInbox");
  };

  const composeHandler = () => {
    history.replace("/SendMail");
  };

  const sendHandler = () => {
    history.replace("/Sent");
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <h1>Mail Box </h1>
      {isloggedIn && (
        <Button className="btn btn-warning " onClick={composeHandler}>
          Compose Mail
        </Button>
      )}
      {isloggedIn && (
        <Button className="btn btn-warning " onClick={inboxHandler}>
          Inbox ( {totalInboxUnread} )
        </Button>
      )}
      {isloggedIn && (
        <Button className="btn btn-warning " onClick={sendHandler}>
          Sent Box ( {totalSentUnread} )
        </Button>
      )}
      <Button className="btn btn-warning float-right" onClick={logoutHandler}>
        Logout
      </Button>
    </nav>
  );
};

export default Header;
