import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    logedOut: (state, action) => {
      return {};
    },
  },
});

export const { addUser, logedOut } = userDataSlice.actions;
export default userDataSlice.reducer;
