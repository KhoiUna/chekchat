import io from "socket.io-client";
import { origin } from "../config/config";
import { pushChatMessage } from "../features/chatSlice";
import { loadNotificationCountAsync } from "../features/notificationSlice";

export const socketMiddleware = (store) => {
  const socket = io(origin, {
    withCredentials: true,
    autoConnect: false,
  });

  return (next) => (action) => {
    if (action.type === "notifications/clickNotification") {
      socket.emit("click notification", action.payload);
      return;
    }

    if (action.type === "chat/subscribe") {
      socket.emit("chat subscribe", { roomId: action.payload });
      return;
    }

    if (action.type === "chat/unsubscribe") {
      socket.emit("chat unsubscribe");
      return;
    }

    if (action.type === "chat/chatMessage") {
      socket.emit("chat message", action.payload);
      return;
    }

    if (action.type === "user/subscribe") {
      socket.connect();
      socket.emit("subscribe");
      setupSocketListener(socket, store);
    }

    if (action.type === "missions/replyMission") {
      socket.emit("mission requests", action.payload);
    }

    if (action.type === "friends/replyFriendRequest") {
      socket.emit("friend requests", action.payload);
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

    return next(action);
  };
};

const setupSocketListener = (socket, store) =>
  socket.on("update", (action) => {
    if (action.type === "notification count") {
      store.dispatch(loadNotificationCountAsync());
    }
    if (action.type === "chat message") {
      store.dispatch(pushChatMessage(action.payload));

      //Scroll to bottom after receiving chat message from socket server
      document.querySelector("#chat-display").scrollTop =
        document.querySelector("#chat-display").scrollHeight;
    }
  });
