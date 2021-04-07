const { getUser } = require("./Users");
const client = require("../db/client");

module.exports = {
  async getNotifications(email, forComp = undefined) {
    try {
      const collection = client.db("chekchat").collection("notifications");

      if (forComp === "bell") {
        const notificationList = await collection
          .find({
            "to_user.email": email,
            seen: false,
          })
          .sort({ time: -1 })
          .toArray();
        return notificationList;
      }

      const notificationList = await collection
        .find({
          "to_user.email": email,
        })
        .sort({ time: -1 })
        .toArray();
      return notificationList;
    } catch (err) {
      console.error("Error getting notifications");
    }
  },
  async saveMissionRequest(userEmail, receiverEmail, type, action, time) {
    try {
      //Get sender info
      const senderInfo = await getUser(userEmail);

      //Get receiver info
      const receiverInfo = await getUser(receiverEmail);

      const collection = client.db("chekchat").collection("notifications");
      const response = await collection.insertOne({
        from_user: senderInfo,
        to_user: receiverInfo,
        type,
        text: `${senderInfo.username} ${action}ed your ${type} request`,
        seen: false,
        time: new Date(time),
      });
      return response;
    } catch (err) {
      console.error("Error saving notification");
      return null;
    }
  },
};
