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

    if (action.type === "missions/updateMissionTodoList") {
      const { id, updateAction, value } = action.payload;

      if (updateAction === "check") {
        socket.emit("check missions", { missionId: id, completed: value });
      }
      if (updateAction === "star") {
        socket.emit("star missions", { missionId: id, starred: value });
      }
    }

    if (action.type === "friends/replyFriendRequest") {
      socket.emit("friend requests", action.payload);
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
