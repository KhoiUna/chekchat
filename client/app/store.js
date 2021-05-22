import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import notificationsReducer from "../features/notificationsSlice";
import { socketMiddleware } from "../middleware/socketMiddleware";

const makeStore = () =>
  configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware),
  });

export const wrapper = createWrapper(makeStore);
