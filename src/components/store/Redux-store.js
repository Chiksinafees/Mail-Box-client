import { configureStore } from "@reduxjs/toolkit";
import MailReducer from "./MailStore";
import InboxReducer from "./InboxStore";

const store = configureStore({
  reducer: {
    auth: MailReducer,
    array: InboxReducer,
  },
});

export default store;
