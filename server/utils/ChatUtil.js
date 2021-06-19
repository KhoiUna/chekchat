const { ObjectID } = require("mongodb");
const client = require("../db/client");
const UsersUtil = require("./UsersUtil");

module.exports = class ChatUtil {
  static async getChatRooms({ userId, position }) {
    try {
      const collection = client.db("chekchat").collection("rooms");

      let agg;
      if (position === "received") {
        agg = [
          {
            $match: {
              to_user: ObjectID(userId),
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
          {
            $lookup: {
              from: "users",
              localField: "from_user",
              foreignField: "_id",
              as: "from_user",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "to_user",
              foreignField: "_id",
              as: "to_user",
            },
          },
          {
            $project: {
              missionId: 1,
              from_user: {
                username: { $arrayElemAt: ["$from_user.username", 0] },
                email: { $arrayElemAt: ["$from_user.email", 0] },
                avatarURL: { $arrayElemAt: ["$from_user.avatarURL", 0] },
              },
              to_user: {
                username: { $arrayElemAt: ["$to_user.username", 0] },
                email: { $arrayElemAt: ["$to_user.email", 0] },
                avatarURL: { $arrayElemAt: ["$to_user.avatarURL", 0] },
              },
              notified: 1,
              last_updated: 1,
              lastMessage: 1,
              mission: { subject: { $arrayElemAt: ["$mission.subject", 0] } },
            },
          },
        ];
      }
      if (position === "sent") {
        agg = [
          {
            $match: {
              from_user: ObjectID(userId),
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
          {
            $lookup: {
              from: "users",
              localField: "from_user",
              foreignField: "_id",
              as: "from_user",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "to_user",
              foreignField: "_id",
              as: "to_user",
            },
          },
          {
            $project: {
              missionId: 1,
              from_user: {
                username: { $arrayElemAt: ["$from_user.username", 0] },
                email: { $arrayElemAt: ["$from_user.email", 0] },
                avatarURL: { $arrayElemAt: ["$from_user.avatarURL", 0] },
              },
              to_user: {
                username: { $arrayElemAt: ["$to_user.username", 0] },
                email: { $arrayElemAt: ["$to_user.email", 0] },
                avatarURL: { $arrayElemAt: ["$to_user.avatarURL", 0] },
              },
              notified: 1,
              last_updated: 1,
              lastMessage: 1,
              mission: { subject: { $arrayElemAt: ["$mission.subject", 0] } },
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
