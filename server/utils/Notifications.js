const { getUser } = require("./Users");
const client = require("../db/client");
const { ObjectID } = require("bson");

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
  async saveNotification(userEmail, receiverEmail, type, action) {
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
        text: `${action}ed your ${type} request`,
        clicked: false,
        time: new Date(new Date().toUTCString()),
      });
      return response;
    } catch (err) {
      console.error("Error saving notification");
      return null;
    }
  },
  async updateClickedNotification(notificationId) {
    try {
      const collection = client.db("chekchat").collection("notifications");

      const response = await collection.updateOne(
        {
          _id: ObjectID(notificationId),
        },
        { $set: { clicked: true } }
      );
      if (!response) return false;

      return response;
    } catch (err) {
      console.error("Error updating notification when clicked");
      return null;
    }
  },
};
