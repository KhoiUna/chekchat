import io from "socket.io-client";
import { origin } from "../config/config";
import { loadNotificationCountAsync } from "../features/notificationSlice";

export const socketMiddleware = (store) => {
  const socket = io(origin, { withCredentials: true });

  return (next) => (action) => {
    if (action.type === "notifications/clickNotification") {
      socket.emit("click notification", action.payload);
      return;
    }

    if (action.type === "user/loadUserInfo/fulfilled") {
      socket.emit("subscribe", localStorage.getItem("email"));
      setupSocketListener(socket, store);
    }

    if (action.type === "missions/replyMission") {
      socket.emit("mission requests", action.payload);
    }

    return next(action);
  };
};

const setupSocketListener = (socket, store) =>
  socket.on("update", (action) => {
    if (action.type === "notification count") {
      store.dispatch(loadNotificationCountAsync());
    }
  });
