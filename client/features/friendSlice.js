import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import removeItemFromList from "../helpers/removeItemFromList";
import FriendRequestUtil from "../utils/FriendRequestUtil";
import FriendsUtil from "../utils/FriendsUtil";

//Async thunk
export const loadFriendListAsync = createAsyncThunk(
  "user/loadFriendListAsync",
  async () => await FriendsUtil.fetchFriendList()
);

export const loadReceivedFriendRequestsListAsync = createAsyncThunk(
  "user/loadReceivedFriendRequestsList",
  async () => await FriendRequestUtil.fetchReceivedFriendRequestsList()
);

//Slice
export const friendSlice = createSlice({
  name: "friends",
  initialState: {
    friendList: [],
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
    [loadFriendListAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadFriendListAsync.fulfilled]: (state, action) => {
      state.friendList = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadFriendListAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
    //
    //
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
export const selectFriendList = (state) => state.friends.friendList;
export const selectFriendRequestList = (state) =>
  state.friends.friendRequestList;
