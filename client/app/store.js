import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import notificationsReducer from "../features/notificationSlice";
import userReducer from "../features/userSlice";
import missionsReducer from "../features/missionSlice";
import { socketMiddleware } from "../middleware/socketMiddleware";

const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      missions: missionsReducer,
      notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware),
  });

export const wrapper = createWrapper(makeStore);
