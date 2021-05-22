import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import removeItemFromList from "../helpers/removeItemFromList";
import FriendRequestUtil from "../utils/FriendRequestUtil";
import UsersUtil from "../utils/UsersUtil";

//Async thunk
export const loadReceivedFriendRequestsListAsync = createAsyncThunk(
  "user/loadReceivedFriendRequestsList",
  async () => await FriendRequestUtil.fetchReceivedFriendRequestsList()
);

//Slice
export const friendSlice = createSlice({
  name: "friends",
  initialState: {
    friendRequestList: [],
    isLoading: false,
    failedToLoad: false,
  },
  reducers: {
    replyFriendRequest: (state, action) => {
      const { requestId } = action.payload;
      state.friendRequestList = removeItemFromList(
        state.friendRequestList,
        requestId
      );
    },
  },
  extraReducers: {
    [loadReceivedFriendRequestsListAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadReceivedFriendRequestsListAsync.fulfilled]: (state, action) => {
      state.friendRequestList = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadReceivedFriendRequestsListAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
  },
});

export const { replyFriendRequest } = friendSlice.actions;
export default friendSlice.reducer;

//Selectors
export const selectIsLoading = (state) => state.friends.isLoading;
export const selectFriendRequestList = (state) =>
  state.friends.friendRequestList;
