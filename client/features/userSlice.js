import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UsersUtil from "../utils/UsersUtil";

//Async thunk

//Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    isLoading: false,
    failedToLoad: false,
  },
  reducers: {},
  extraReducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;

//Selectors
export const selectUserInfo = (state) => state.user.userInfo;
