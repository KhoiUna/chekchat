const { getUser } = require("./Users");
const client = require("../db/client");

module.exports = {
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
        due_date: selectedDate,
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
