import { configureStore } from "@reduxjs/toolkit";
import MailReducer from "./MailStore";
import InboxReducer from "./InboxStore";
import ObjReducer from "./ObjStore";

const store = configureStore({
  reducer: {
    auth: MailReducer,
    array: InboxReducer,
    obj: ObjReducer,
  },
});

export default store;
