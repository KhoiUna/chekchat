const { ObjectID } = require("bson");
const client = require("../db/client");
const UsersUtil = require("./UsersUtil");

module.exports = class FriendRequestUtil {
  static async saveRequest(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const response = await collection.insertOne({
        from: await UsersUtil.getUser(userEmail),
        to: await UsersUtil.getUser(requestEmail),
        status: "Pending",
      });
      return response;
    } catch (err) {
      console.error("Error saving friend request");
      return null;
    }
  }

  static async updateRequest(requestId, action) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");
      const status = action === "accept" ? "Accepted" : "Rejected";

      const { modifiedCount } = await collection.updateOne(
        {
          _id: ObjectID(requestId),
        },
        { $set: { status } }
      );

      if (!modifiedCount) return false;

      const response = await collection.findOne({
        _id: ObjectID(requestId),
      });
      const friendEmail = response.from.email;
      const userEmail = response.to.email;

      return { userEmail, friendEmail };
    } catch (err) {
      console.error("Error updating friend request --- utils");
      return null;
    }
  }

  static async removeRequest(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const response = await collection.deleteOne({
        "from.email": userEmail,
        "to.email": requestEmail,
      });

      return response;
    } catch (err) {
      console.error("Error deleting friend request");
      return null;
    }
  }

  static async checkAlreadySent(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const cursor = await collection.find({
        "from.email": userEmail,
        "to.email": requestEmail,
        status: "Pending",
      });
      const friendRequest = await cursor.next();
      if (friendRequest) return true;

      return false;
    } catch (err) {
      console.error("Error checking user's friend request");
      return null;
    }
  }

  static async getSentFriendRequestList(userEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const friendRequestList = await collection
        .find({
          "from.email": userEmail,
          status: "Pending",
        })
        .toArray();
      return friendRequestList;
    } catch (err) {
      console.error("Error getting friend request list");
      return null;
    }
  }

  static async getReceivedFriendRequestList(userEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const friendRequestList = await collection
        .find({
          "to.email": userEmail,
          status: "Pending",
        })
        .toArray();
      return friendRequestList;
    } catch (err) {
      console.error("Error getting friend request list");
      return null;
    }
  }
};
