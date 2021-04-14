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
            visibility: true,
          })
          .toArray();
        return missionRequestList;
      } else {
        const missionRequestList = await collection
          .find({
            "to.email": email,
            status: "Pending",
          })
          .toArray();
        return missionRequestList;
      }
    } catch (err) {
      console.error("Error getting mission request");
    }
  },
  async getMissionTodoList(userEmail) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const missionTodoList = await collection
        .find({
          "to.email": userEmail,
          status: "Accepted",
        })
        .toArray();
      return missionTodoList;
    } catch (err) {
      console.error("Error getting mission todo list");
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
        completed: false,
        starred: false,
        visibility: true,
        sent_date: new Date(new Date().toUTCString()),
      });
      return response;
    } catch (err) {
      console.error("Error saving mission request");
      return null;
    }
  },
  async updateRequest(requestId, action) {
    try {
      const collection = client.db("chekchat").collection("missions");
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
      const senderEmail = response.from.email;
      const receiverEmail = response.to.email;

      return { senderEmail, receiverEmail };
    } catch (err) {
      console.error("Error updating mission request --- utils");
      return null;
    }
  },
  async deletePendingRequest(requestId) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const { deletedCount } = await collection.deleteOne({
        _id: ObjectID(requestId),
        status: "Pending",
      });

      return deletedCount;
    } catch (err) {
      console.error("Error deleting pending mission request --- utils");
      return null;
    }
  },
  async updateMissionComplete(missionId, completed) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const response = await collection.updateOne(
        {
          _id: ObjectID(missionId),
        },
        { $set: { completed } }
      );
      if (!response) return false;

      return response;
    } catch (err) {
      console.error("Error updating mission check --- utils");
      return null;
    }
  },
  async updateVisibility(missionId) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const response = await collection.updateOne(
        {
          _id: ObjectID(missionId),
        },
        { $set: { visibility: false } }
      );
      return response;
    } catch (err) {
      console.error("Error updating mission visibility --- utils");
      return null;
    }
  },
  async updateMissionStarred(missionId, starred) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const response = await collection.updateOne(
        {
          _id: ObjectID(missionId),
        },
        { $set: { starred } }
      );
      if (!response) return false;

      return response;
    } catch (err) {
      console.error("Error updating mission starred --- utils");
      return null;
    }
  },
};
