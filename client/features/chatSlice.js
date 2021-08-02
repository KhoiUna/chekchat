import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ChatUtil from "../utils/ChatUtil";

//Async thunk
export const loadChatRoomsAsync = createAsyncThunk(
  "chat/loadChatRooms",
  async (position) => await ChatUtil.fetchChatRooms(position)
);

export const loadChatRoomTitleAsync = createAsyncThunk(
  "chat/loadChatRoomTitle",
  async (roomId) => await ChatUtil.fetchChatRoomTitle(roomId)
);

export const loadChatMessagesAsync = createAsyncThunk(
  "chat/loadChatMessages",
  async (roomId) => {
    //FIXME
    await ChatUtil.fetchChatMessages(roomId);

    return new Array(20).fill({
      from_user: {
        username: "John Doe",
        avatarURL: "/chekchat_upload/user_avatar_qTUoDmgcE.png",
      },
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.\nAhahahihi ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
      sent_datetime: 651681631651651,
    });
  }
);

//Slice
export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRooms: [],
    chatRoomTitle: "",
    chatMessages: [],
    isLoading: false,
    failedToLoad: false,
  },
  reducers: {
    pushChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
  },
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
    //
    [loadChatRoomTitleAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadChatRoomTitleAsync.fulfilled]: (state, action) => {
      state.chatRoomTitle = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadChatRoomTitleAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
    //
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

export const { pushChatMessage } = chatSlice.actions;
export default chatSlice.reducer;

//Selectors
export const selectChatIsLoading = (state) => state.chat.isLoading;
export const selectChatRooms = (state) => state.chat.chatRooms;
export const selectChatRoomTitle = (state) => state.chat.chatRoomTitle;
export const selectChatMessages = (state) => state.chat.chatMessages;
