import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import notificationsReducer from "../features/notificationsSlice";
import userReducer from "../features/userSlice";
import { socketMiddleware } from "../middleware/socketMiddleware";

const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware),
  });

export const wrapper = createWrapper(makeStore);
