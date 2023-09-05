import { createSlice } from "@reduxjs/toolkit";

const isAuthSlice = createSlice({
  name: "isAuth",
  initialState: false,
  reducers: {
    isLoggedIn: (state, action) => {
      return true;
    },
    isSignUp: (state, action) => {
      return true;
    },
    isLogOut: (state, action) => {
      return false;
    },
  },
});

export const { isLoggedIn, isSignUp, isLogOut } = isAuthSlice.actions;
export default isAuthSlice.reducer;
