import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NotificationsUtil from "../utils/NotificationsUtil";

//Async thunk
export const loadNotificationCountAsync = createAsyncThunk(
  "notifications/loadNotificationCount",
  async () => await NotificationsUtil.fetchNotificationCountForBell()
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
  reducers: {
    incrementNotificationCount: (state, action) => {
      state.notificationCount++;
    },
  },
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
  },
});

export const {} = notificationsSlice.actions;
export default notificationsSlice.reducer;

//Selectors
export const selectNotificationCount = (state) =>
  state.notifications.notificationCount;
