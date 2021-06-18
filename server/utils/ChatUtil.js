const client = require("../db/client");

module.exports = class ChatUtil {
  static async getChatRooms(userEmail, position) {
    try {
      const collection = client.db("chekchat").collection("rooms");

      let chatRooms;
      if (position === "received") {
        chatRooms = await collection
          .find({
            "to_user.email": userEmail,
          })
          .sort({ last_updated: 1 })
          .toArray();
      } else {
        chatRooms = await collection
          .find({
            "from_user.email": userEmail,
          })
          .sort({ last_updated: 1 })
          .toArray();
      }

      return chatRooms;
    } catch (err) {
      console.error("Error getting chat rooms --util");
      return null;
    }
  }
};
