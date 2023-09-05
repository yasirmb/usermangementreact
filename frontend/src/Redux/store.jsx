import { configureStore } from "@reduxjs/toolkit";
import isAuthReducer from "./isAuthReducer";
import jwtAuthReducer from "./jwtAuthReducer";
import setUserData from "./setUserData";
import usersListSlice from "./usersListSlice";

const store = configureStore({
  reducer: {
    isAuth: isAuthReducer,
    userJwt: jwtAuthReducer,
    userData: setUserData,
    allUsers: usersListSlice,
  },
});

export default store;
