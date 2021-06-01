const client = require("../db/client");

module.exports = class FeedbackUtil {
  static async saveFeedback(subject, comment, senderEmail) {
    try {
      const collection = client.db("chekchat").collection("feedbacks");
      const response = await collection.insertOne({
        subject,
        from_user: senderEmail,
        submitted_date: new Date(new Date().toUTCString()),
        comment,
      });
      return response;
    } catch (err) {
      console.error("Error saving feedback --util");
      return null;
    }
  }
};
