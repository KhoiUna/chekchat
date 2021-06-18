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

  static async fetchChatMessages() {
    try {
      return;
    } catch (err) {
      console.error("Error getting chat messages");
      return;
    }
  }
}
