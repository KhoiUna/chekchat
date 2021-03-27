const { getUser } = require("./Users");
const client = require("../db/client");
const { ObjectID } = require("bson");

module.exports = {
  async getMissionRequest(position, email) {
    try {
      const collection = client.db("chekchat").collection("missions");

      if (position === "from") {
        const missionRequestList = await collection
          .find({
            "from.email": email,
          })
          .toArray();
        return missionRequestList;
      } else {
        const missionRequestList = await collection
          .find({
            "to.email": email,
          })
          .toArray();
        return missionRequestList;
      }
    } catch (err) {
      console.error("Error getting mission request");
    }
  },
  async getMissionInfo(requestId) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const missionInfo = await collection.findOne({
        _id: ObjectID(requestId),
      });
      return missionInfo;
    } catch (err) {
      console.error("Error getting mission info");
    }
  },
  async saveMissionRequest(
    userEmail,
    subject,
    selectedDate,
    receiverEmail,
    description
  ) {
    try {
      //Get sender info
      const senderInfo = await getUser(userEmail);

      //Get receiver info
      const receiverInfo = await getUser(receiverEmail);

      const collection = client.db("chekchat").collection("missions");
      const response = await collection.insertOne({
        subject,
        due_date: new Date(selectedDate),
        from: senderInfo,
        to: receiverInfo,
        description,
        status: "Pending",
      });
      return response;
    } catch (err) {
      console.error("Error saving mission request");
      return null;
    }
  },
};
