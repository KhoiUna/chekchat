import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import notificationsReducer from "../features/notificationSlice";
import userReducer from "../features/userSlice";
import missionsReducer from "../features/missionSlice";
import friendsReducer from "../features/friendSlice";
import chatReducer from "../features/chatSlice";
import { socketMiddleware } from "../middleware/socketMiddleware";

const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      missions: missionsReducer,
      friends: friendsReducer,
      notifications: notificationsReducer,
      chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware),
  });

export const wrapper = createWrapper(makeStore);
