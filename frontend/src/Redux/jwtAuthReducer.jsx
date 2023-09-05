import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getJwt = createAsyncThunk("jwt/getJwt", async () => {
  return localStorage.getItem("userjwt");
});

getJwt.pending;
getJwt.fulfilled;
getJwt.rejected;

const jwtAuthSlice = createSlice({
  name: "jwt",
  initialState: {
    data: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [getJwt.pending.type]: (state, action) => {
      state.loading = true;
      state.data = action.payload;
    },
    [getJwt.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getJwt.rejected.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "error found";
    },
  },
});
export { getJwt };
export default jwtAuthSlice.reducer;
