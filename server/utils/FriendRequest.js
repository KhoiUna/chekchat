const client = require("../db/client");
const { getUser } = require("./Users");

module.exports = {
  async saveRequest(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friend_requests");

      const response = await collection.insertOne({
        from: await getUser(userEmail),
        to: await getUser(requestEmail),
        status: "pending",
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

      const friendRequest = await collection.findOne({
        from: { email: userEmail },
        to: { email: requestEmail },
        status: "pending",
      });
      if (friendRequest) return true;

      return false;
    } catch (err) {
      console.error("Error checking user's friends");
      return null;
    }
  },
};
