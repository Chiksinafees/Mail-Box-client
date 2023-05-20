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
    <header className="bg-gradient-to-r from-black from-20% via-sky-600 via-60% to-sky-300 to-90%">
      <div className="container py-8 px-2 flex flex-wrap items-center justify-between mx-6">
        <h1 className="text-white font-bold text-5xl font-serif">Mail Box</h1>
        <div className="flex flex-col items-center justify-center md:flex-row md:items-center">
          {isloggedIn && (
            <button
              className="text-white font-bold py-2 px-4 rounded-md mr-4 bg-gray-500 hover:bg-black transition-colors mb-2 md:mb-0 md:mr-8"
              onClick={composeHandler}
            >
              Compose Mail
            </button>
          )}
          {isloggedIn && (
            <button
              className="text-white font-bold py-2 px-4 rounded-md mr-4 bg-gray-500 hover:bg-black transition-colors mb-2 md:mb-0 md:mr-8"
              onClick={inboxHandler}
            >
              Inbox ( {totalInboxUnread} )
            </button>
          )}
          {isloggedIn && (
            <button
              className="text-white font-bold py-2 px-4 rounded-md mr-4 bg-gray-500 hover:bg-black transition-colors mb-2 md:mb-0 md:mr-8"
              onClick={sendHandler}
            >
              Sent Box ( {totalSentUnread} )
            </button>
          )}
          <button
            className="text-white font-bold py-2 px-4 rounded-md mb-2 bg-gray-500 hover:bg-black transition-colors"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
