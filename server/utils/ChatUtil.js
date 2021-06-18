const { ObjectID } = require("mongodb");
const client = require("../db/client");
const UsersUtil = require("./UsersUtil");

module.exports = class ChatUtil {
  static async getChatRooms(userEmail, position) {
    try {
      const collection = client.db("chekchat").collection("rooms");

      let agg;
      if (position === "received") {
        agg = [
          {
            $match: {
              "to_user.email": userEmail,
            },
          },
          {
            $lookup: {
              from: "missions",
              localField: "missionId",
              foreignField: "_id",
              as: "mission",
            },
          },
        ];
      }
      if (position === "sent") {
        agg = [
          {
            $match: {
              "from_user.email": userEmail,
            },
          },
          {
            $lookup: {
              from: "missions",
              localField: "missionId",
              foreignField: "_id",
              as: "mission",
            },
          },
        ];
      }

      const chatRooms = await collection
        .aggregate(agg)
        .sort({ last_updated: 1 })
        .toArray();

      return chatRooms;
    } catch (err) {
      console.error("Error getting chat rooms --util");
      return null;
    }
  }

  static async createChatRoom({ requestId, senderEmail, receiverEmail }) {
    try {
      const collection = client.db("chekchat").collection("rooms");

      const response = await collection.insertOne({
        missionId: ObjectID(requestId),
        from_user: await UsersUtil.getUser(senderEmail),
        to_user: await UsersUtil.getUser(receiverEmail),
        notified: false,
        last_updated: new Date(new Date().toUTCString()),
        lastMessage: "Let's start your discussion!",
      });
      return response;
    } catch (err) {
      console.error("Error creating chat room ---util");
      return;
    }
  }
};
