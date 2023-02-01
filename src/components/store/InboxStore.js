import { createSlice } from "@reduxjs/toolkit";

const inboxStore = {
  inbox: [],
  sentbox: [],
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxStore,
  reducers: {
    inboxHandler(currState, action) {
      currState.inbox = action.payload.newArray;
    },
    sentHandler(currState, action) {
      currState.sentbox = action.payload.newArray2;
    },

    inboxMailRead(currState, action) {
      const index = currState.inbox.findIndex((mail) => {
        return mail.id === action.payload;
      });
      currState.inbox[index] = { ...currState.inbox[index], read: true };
    },

    sentMailRead(currState, action) {
      const index = currState.sentbox.findIndex((mail) => {
        return mail.id === action.payload;
      });
      currState.sentbox[index] = { ...currState.sentbox[index], read: true };
    },
  },
});

export const inboxActions = inboxSlice.actions;
export default inboxSlice.reducer;
