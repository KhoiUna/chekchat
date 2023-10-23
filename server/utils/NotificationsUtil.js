const client = require("../db/client");
const { ObjectId } = require("mongodb");

module.exports = class NotificationsUtil {
  static async getNotifications(userId) {
    try {
      const collection = client.db("chekchat").collection("notifications");
      const agg = [
        {
          $match: {
            to_user: new ObjectId(userId),
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
              email: { $arrayElemAt: ["$from_user.email", 0] },
              avatarURL: { $arrayElemAt: ["$from_user.avatarURL", 0] },
            },
            type: 1,
            clicked: 1,
            text: 1,
            time: 1,
          },
        },
      ];

      const notificationList = await collection
        .aggregate(agg)
        .sort({ time: -1 })
        .toArray();
      return notificationList;
    } catch (err) {
      console.error("Error getting notifications --util");
    }
  }

  static async saveNotification(userId, friendId, type, action) {
    try {
      const collection = client.db("chekchat").collection("notifications");
      const response = await collection.insertOne({
        from_user: new ObjectId(userId),
        to_user: new ObjectId(friendId),
        type,
        text: `${action}ed your ${type} request`,
        clicked: false,
        time: new Date(new Date().toUTCString()),
      });
      return response;
    } catch (err) {
      console.error("Error saving notification");
      return null;
    }
  }

  static async updateClickedNotification(notificationId) {
    try {
      const collection = client.db("chekchat").collection("notifications");

      const response = await collection.updateOne(
        {
          _id: new ObjectId(notificationId),
        },
        { $set: { clicked: true } }
      );
      if (!response) return false;

      return response;
    } catch (err) {
      console.error("Error updating notification when clicked");
      return null;
    }
  }
};
