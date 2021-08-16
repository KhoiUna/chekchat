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

  static async fetchChatMessages(roomId) {
    try {
      const chatMessages = await fetch(
        `${origin}/api/user/chat/messages/${roomId}`,
        {
          credentials: "include",
        }
      ).json();

      return chatMessages;
    } catch (err) {
      console.error("Error getting chat messages");
      return;
    }
  }
}
