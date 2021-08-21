import { origin } from "../config/config";

export default class ChatUtil {
  static async fetchChatRooms(position) {
    try {
      const res = await fetch(
        `${origin}/api/user/chat/rooms?position=${position}`,
        {
          credentials: "include",
        }
      );

      if (res.ok === false) return;

      const chatRooms = await res.json();
      return chatRooms;
    } catch (err) {
      console.error("Error getting chat rooms");
      return;
    }
  }

  static async fetchChatRoomTitle(roomId) {
    try {
      const roomTitle = await (
        await fetch(`${origin}/api/user/chat/room/${roomId}`, {
          credentials: "include",
        })
      ).json();

      return roomTitle;
    } catch (error) {
      console.error("Error getting chat room title");
      return;
    }
  }

  static async fetchChatMessages(roomId, queryLimit) {
    try {
      const chatMessages = await (
        await fetch(
          `${origin}/api/user/chat/messages/${roomId}?queryLimit=${queryLimit}`,
          {
            credentials: "include",
          }
        )
      ).json();

      return chatMessages.reverse();
    } catch (err) {
      console.error("Error getting chat messages");
      return;
    }
  }
}
