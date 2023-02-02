import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../components/store/InboxStore";

const useMail = async (sent = true) => {
  const loggedEmail = useSelector((currState) => currState.auth.email);
  const dispatch = useDispatch();

  //const getSentData = async () => {

  let url;
  if (sent) {
    url = `https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/sent.json`;
  } else {
    url=`https://mail-box-b419a-default-rtdb.firebaseio.com/${loggedEmail}/inbox.json`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
    if(sent){
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
          dispatch(inboxActions.sentMailRead(newArray2))
       }
    }else{
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
      dispatch(inboxActions.inboxMailRead(newArray))
    }
}

}
//   useEffect(() => {
//     getSentData();
//   }, []);
;

export default useMail;
