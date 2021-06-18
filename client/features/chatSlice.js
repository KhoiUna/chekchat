import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ChatUtil from "../utils/ChatUtil";

//Async thunk
export const loadChatRoomsAsync = createAsyncThunk(
  "chat/loadChatRooms",
  async (position) => await ChatUtil.fetchChatRooms(position)
);

export const loadChatMessagesAsync = createAsyncThunk(
  "chat/loadChatMessages",
  async () => await ChatUtil.fetchChatMessages()
);

//Slice
export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRooms: [],
    chatMessages: [],
    isLoading: false,
    failedToLoad: false,
  },
  reducers: {},
  extraReducers: {
    [loadChatRoomsAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadChatRoomsAsync.fulfilled]: (state, action) => {
      state.chatRooms = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadChatRoomsAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
    //
    [loadChatMessagesAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadChatMessagesAsync.fulfilled]: (state, action) => {
      state.chatMessages = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadChatMessagesAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
  },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;

//Selectors
export const selectChatIsLoading = (state) => state.chat.isLoading;
export const selectChatRooms = (state) => state.chat.chatRooms;
export const selectChatMessages = (state) => state.chat.chatMessages;
