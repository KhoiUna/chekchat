const { ObjectID } = require("mongodb");
const client = require("../db/client");

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
        .sort({ last_updated: -1 })
        .toArray();

      return chatRooms;
    } catch (err) {
      console.error("Error getting chat rooms ---util");
      return null;
    }
  }

  static async createChatRoom({ requestId, senderId, receiverId }) {
    try {
      const collection = client.db("chekchat").collection("rooms");

      const response = await collection.insertOne({
        missionId: ObjectID(requestId),
        from_user: ObjectID(senderId),
        to_user: ObjectID(receiverId),
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

  static async getChatRoomTitle({ roomId }) {
    try {
      const collection = client.db("chekchat").collection("rooms");

      const agg = [
        {
          $match: {
            _id: ObjectID(roomId),
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
          $project: {
            mission: {
              subject: { $arrayElemAt: ["$mission.subject", 0] },
            },
          },
        },
      ];

      const response = await collection.aggregate(agg).next();
      const roomTitle = response.mission[0].subject;

      return roomTitle;
    } catch (err) {
      console.error("Error getting chat room title ---util");
      return;
    }
  }

  static async saveMessage(msgObj) {
    try {
      const collection = client.db("chekchat").collection("messages");

      const response = await collection.insertOne(msgObj);

      return response;
    } catch (err) {
      console.error("Error saving message ---util");
      return;
    }
  }

  static async getChatMessages({ roomId, queryLimit }) {
    try {
      const collection = client.db("chekchat").collection("messages");

      const agg = [
        {
          $match: {
            roomId: ObjectID(roomId),
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
          $project: {
            from_user: {
              username: { $arrayElemAt: ["$from_user.username", 0] },
              avatarURL: { $arrayElemAt: ["$from_user.avatarURL", 0] },
            },
            sent_datetime: 1,
            message: 1,
          },
        },
        { $sort: { sent_datetime: -1 } },
        { $skip: queryLimit * 20 },
        { $limit: 20 },
      ];

      const chatMessages = await collection.aggregate(agg).toArray();

      return chatMessages;
    } catch (err) {
      console.error("Error getting chat messages ---util");
      return;
    }
  }

  static async updateChatRoom({ lastMessage, notified, last_updated, roomId }) {
    try {
      const collection = client.db("chekchat").collection("rooms");

      const response = await collection.updateOne(
        {
          _id: ObjectID(roomId),
        },
        { $set: { notified, last_updated, lastMessage } }
      );
      if (!response) return false;

      return response;
    } catch (err) {
      console.error("Error updating chat room ---util");
    }
  }
};
