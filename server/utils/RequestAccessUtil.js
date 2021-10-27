const { ObjectId } = require("bson");
const client = require("../db/client");

module.exports = class RequestAccessUtil {
  static async saveAccessRequest(email) {
    try {
      const collection = client.db("chekchat").collection("early_access_users");

      const response = await collection.insertOne({
        email,
        requested_date: new Date(new Date().toUTCString()),
        viewed_survey: false,
      });
      return response;
    } catch (err) {
      console.error("Error saving early user ---util");
      return null;
    }
  }

  static async updateAccessRequest(id) {
    try {
      const collection = client.db("chekchat").collection("early_access_users");

      const response = await collection.updateOne(
        {
          _id: ObjectId(id),
        },
        {
          $set: {
            viewed_survey: true,
          },
        }
      );
      return response;
    } catch (err) {
      console.error("Error updating early user ---util");
      return null;
    }
  }
};
