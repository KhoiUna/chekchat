import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UsersUtil from "../utils/UsersUtil";

//Async thunk
export const loadUserInfoAsync = createAsyncThunk(
  "user/loadUserInfo",
  async () => await UsersUtil.fetchUserInfo()
);

//Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    isLoading: false,
    failedToLoad: false,
  },
  reducers: {
    updateAvatarURL: (state, action) => {
      state.userInfo.avatarURL = action.payload;
    },
  },
  extraReducers: {
    [loadUserInfoAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadUserInfoAsync.fulfilled]: (state, action) => {
      state.userInfo = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadUserInfoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
  },
});

export const { updateAvatarURL } = userSlice.actions;
export default userSlice.reducer;

//Selectors
export const selectUserInfo = (state) => state.user.userInfo;
