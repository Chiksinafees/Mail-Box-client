import { createSlice } from "@reduxjs/toolkit";

const objStore = {
  specificEmail: {},
};

const objSlice = createSlice({
  name: "obj",
  initialState: objStore,
  reducers: {
    objHandler(currState, action) {
      //console.log(action.payload);
      currState.specificEmail = action.payload;
    },
  },
});

export const objActions = objSlice.actions;
export default objSlice.reducer;
