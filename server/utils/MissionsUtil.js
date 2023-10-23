const UsersUtil = require("./UsersUtil");
const client = require("../db/client");
const { ObjectId } = require("mongodb");

module.exports = class MissionsUtil {
  static async getMissionRequest(position, userId) {
    try {
      const collection = client.db("chekchat").collection("missions");

      let agg;
      if (position === "from") {
        agg = [
          {
            $match: {
              from_user: new ObjectId(userId),
              visibility: true,
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
              completed: 1,
              description: 1,
              due_date: 1,
              to_user: {
                username: { $arrayElemAt: ["$to_user.username", 0] },
                email: { $arrayElemAt: ["$to_user.email", 0] },
                avatarURL: { $arrayElemAt: ["$to_user.avatarURL", 0] },
              },
              sent_date: 1,
              starred: 1,
              status: 1,
              subject: 1,
              visibility: 1,
            },
          },
        ];
      } else {
        agg = [
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
            $lookup: {
              from: "users",
              localField: "to_user",
              foreignField: "_id",
              as: "to_user",
            },
          },
          {
            $project: {
              completed: 1,
              description: 1,
              due_date: 1,
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
              sent_date: 1,
              starred: 1,
              status: 1,
              subject: 1,
              visibility: 1,
            },
          },
        ];
      }
      const missionRequestList = await collection.aggregate(agg).toArray();
      return missionRequestList;
    } catch (err) {
      console.error("Error getting mission request ---util");
    }
  }

  static async getMissionTodoList(userId) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const missionTodoList = await collection
        .aggregate([
          {
            $match: {
              to_user: new ObjectId(userId),
              status: "Accepted",
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
              completed: 1,
              description: 1,
              due_date: 1,
              from_user: {
                username: { $arrayElemAt: ["$from_user.username", 0] },
                email: { $arrayElemAt: ["$from_user.email", 0] },
                avatarURL: { $arrayElemAt: ["$from_user.avatarURL", 0] },
              },
              sent_date: 1,
              starred: 1,
              status: 1,
              subject: 1,
              visibility: 1,
            },
          },
        ])
        .sort({ due_date: 1 })
        .toArray();
      return missionTodoList;
    } catch (err) {
      console.error("Error getting mission todo list ---util");
    }
  }

  static async getMissionInfo(requestId) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const cursor = await collection.aggregate([
        {
          $match: {
            _id: new ObjectId(requestId),
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
          $lookup: {
            from: "rooms",
            localField: "_id",
            foreignField: "missionId",
            as: "chatroomId",
          },
        },
        {
          $project: {
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
            due_date: 1,
            description: 1,
            subject: 1,
            status: 1,
            chatroomId: {
              $arrayElemAt: ["$chatroomId._id", 0],
            },
          },
        },
      ]);

      const missionInfo = await cursor.next();
      return missionInfo;
    } catch (err) {
      console.error("Error getting mission info ---util");
    }
  }

  static async saveMissionRequest(
    userEmail,
    subject,
    selectedDate,
    receiverEmail,
    description
  ) {
    try {
      const collection = client.db("chekchat").collection("missions");
      const response = await collection.insertOne({
        subject,
        due_date: new Date(selectedDate),
        from_user: await UsersUtil.getUserId(userEmail),
        to_user: await UsersUtil.getUserId(receiverEmail),
        description,
        status: "Pending",
        completed: false,
        starred: false,
        visibility: true,
        sent_date: new Date(new Date().toUTCString()),
      });
      return response;
    } catch (err) {
      console.error("Error saving mission request ---util");
      return null;
    }
  }

  static async updateRequest(requestId, action) {
    try {
      const collection = client.db("chekchat").collection("missions");
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
      const senderId = response.from_user;
      const receiverId = response.to_user;

      return { senderId, receiverId };
    } catch (err) {
      console.error("Error updating mission request --- utils");
      return null;
    }
  }

  static async deletePendingRequest(requestId) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const { deletedCount } = await collection.deleteOne({
        _id: new ObjectId(requestId),
        status: "Pending",
      });

      return deletedCount;
    } catch (err) {
      console.error("Error deleting pending mission request --- utils");
      return null;
    }
  }

  static async updateMissionComplete(missionId, completed) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const response = await collection.updateOne(
        {
          _id: new ObjectId(missionId),
        },
        { $set: { completed } }
      );
      if (!response) return false;

      return response;
    } catch (err) {
      console.error("Error updating mission check --- utils");
      return null;
    }
  }

  static async updateVisibility(missionId) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const response = await collection.updateOne(
        {
          _id: new ObjectId(missionId),
        },
        { $set: { visibility: false } }
      );
      return response;
    } catch (err) {
      console.error("Error updating mission visibility --- utils");
      return null;
    }
  }

  static async updateMissionStarred(missionId, starred) {
    try {
      const collection = client.db("chekchat").collection("missions");

      const response = await collection.updateOne(
        {
          _id: new ObjectId(missionId),
        },
        { $set: { starred } }
      );
      if (!response) return false;

      return response;
    } catch (err) {
      console.error("Error updating mission starred --- utils");
      return null;
    }
  }
};
