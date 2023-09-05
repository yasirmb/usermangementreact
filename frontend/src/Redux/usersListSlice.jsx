import { createSlice } from "@reduxjs/toolkit";

const usersListSlice = createSlice({
  name: "userslist",
  initialState: [],
  reducers: {
    getUsers: (state, action) => {
      return action.payload;
    },
    isAdminlogOut: (state, action) => {
      return [];
    },
  },
});

export const { getUsers, isAdminlogOut } = usersListSlice.actions;
export default usersListSlice.reducer;
