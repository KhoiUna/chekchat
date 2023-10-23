const { ObjectId } = require("mongodb");
const client = require("../db/client");
const UsersUtil = require("./UsersUtil");

module.exports = class FriendRequestUtil {
  static async saveRequest(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const response = await collection.insertOne({
        from_user: new ObjectId(await UsersUtil.getUserId(userEmail)),
        to_user: new ObjectId(await UsersUtil.getUserId(requestEmail)),
        status: "Pending",
      });
      return response;
    } catch (err) {
      console.error("Error saving friend request ---util");
      return null;
    }
  }

  static async updateRequest(requestId, action) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");
      const status = action === "accept" ? "Accepted" : "Rejected";

      const { modifiedCount } = await collection.updateOne(
        {
          _id: new ObjectId(requestId),
        },
        { $set: { status } }
      );

      if (!modifiedCount) return false;

      const response = await collection.findOne({
        _id: new ObjectId(requestId),
      });

      const friendId = response.from_user;
      const userId = response.to_user;

      return { userId, friendId };
    } catch (err) {
      console.error("Error updating friend request --- utils");
      return null;
    }
  }

  static async removeRequest({ userId, friendId }) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const response = await collection.deleteOne({
        from_user: new ObjectId(userId),
        to_user: new ObjectId(friendId),
      });

      return response;
    } catch (err) {
      console.error("Error deleting friend request ---util");
      return null;
    }
  }

  static async checkAlreadySent(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const cursor = await collection.find({
        from_user: new ObjectId(await UsersUtil.getUserId(userEmail)),
        to_user: new ObjectId(await UsersUtil.getUserId(requestEmail)),
        status: "Pending",
      });
      const friendRequest = await cursor.next();
      if (friendRequest) return true;

      return false;
    } catch (err) {
      console.error("Error checking user's friend request ---util");
      return null;
    }
  }

  static async getSentFriendRequestList(userId) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");
      const agg = [
        {
          $match: {
            from_user: new ObjectId(userId),
            status: "Pending",
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
            from_user: 1,
            to_user: {
              username: { $arrayElemAt: ["$to_user.username", 0] },
              email: { $arrayElemAt: ["$to_user.email", 0] },
              avatarURL: { $arrayElemAt: ["$to_user.avatarURL", 0] },
            },
            status: 1,
          },
        },
      ];

      const friendRequestList = await collection.aggregate(agg).toArray();
      return friendRequestList;
    } catch (err) {
      console.error("Error getting friend request list ---util");
      return null;
    }
  }

  static async getReceivedFriendRequestList(userId) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");
      const agg = [
        {
          $match: {
            to_user: new ObjectId(userId),
            status: "Pending",
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
            to_user: 1,
            status: 1,
          },
        },
      ];

      const friendRequestList = await collection.aggregate(agg).toArray();
      return friendRequestList;
    } catch (err) {
      console.error("Error getting friend request list");
      return null;
    }
  }
};
