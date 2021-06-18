const client = require("../db/client");

module.exports = class ChatUtil {
  static async getChatRooms(userEmail) {
    try {
      const collection = client.db("chekchat").collection("rooms");

      const chatRooms = await collection
        .find({
          "to_user.email": userEmail,
        })
        .sort({ last_updated: 1 })
        .toArray();

      return chatRooms;
    } catch (err) {
      console.error("Error getting chat rooms --util");
    }
  }
};
