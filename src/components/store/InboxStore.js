import { createSlice } from "@reduxjs/toolkit";

const inboxStore = {
  inbox: [],
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxStore,
  reducers: {
    inboxHandler(currState, action) {
      // const regex = /[<p><strong>]/g;
      // const emailId = action.payload.newArray[email].replace(regex, "");
      console.log(action.payload.newArray);
      currState.inbox = action.payload.newArray;
    },
  },
});

export const inboxActions = inboxSlice.actions;
export default inboxSlice.reducer;
