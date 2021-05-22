import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NotificationsUtil from "../utils/NotificationsUtil";

//Async thunk
export const loadNotificationCountAsync = createAsyncThunk(
  "notifications/loadNotificationCount",
  async () => await NotificationsUtil.fetchNotificationCountForBell()
);

export const loadNotificationListAsync = createAsyncThunk(
  "notifications/loadNotificationList",
  async () => await NotificationsUtil.fetchNotificationsList()
);

//Slice
export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notificationCount: undefined,
    notificationList: [],
    isLoading: false,
    failedToLoad: false,
  },
  reducers: {},
  extraReducers: {
    [loadNotificationCountAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadNotificationCountAsync.fulfilled]: (state, action) => {
      state.notificationCount = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadNotificationCountAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
    //
    [loadNotificationListAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadNotificationListAsync.fulfilled]: (state, action) => {
      state.notificationList = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadNotificationListAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
  },
});

export const {} = notificationsSlice.actions;
export default notificationsSlice.reducer;

//Selectors
export const selectNotificationIsLoading = (state) =>
  state.notifications.isLoading;
export const selectNotificationCount = (state) =>
  state.notifications.notificationCount;
export const selectNotificationList = (state) =>
  state.notifications.notificationList;
