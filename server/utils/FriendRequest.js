const client = require("../db/client");
const { getUser } = require("./Users");

module.exports = {
  async saveRequest(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const response = await collection.insertOne({
        from: await getUser(userEmail),
        to: await getUser(requestEmail),
        status: "Pending",
      });
      return response;
    } catch (err) {
      console.error("Error saving friend request");
      return null;
    }
  },
  async checkAlreadySent(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const cursor = await collection.find({
        "from.email": userEmail,
        "to.email": requestEmail,
        status: "pending",
      });
      const friendRequest = await cursor.next();
      if (friendRequest) return true;

      return false;
    } catch (err) {
      console.error("Error checking user's friend request");
      return null;
    }
  },
  async getFriendRequestList(userEmail) {
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
  },
};
