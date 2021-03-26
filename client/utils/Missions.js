import { origin } from "../config/config";

module.exports = {
  async sendMissionRequest(subject, selectedDate, receiver, description) {
    try {
      const res = await fetch(`${origin}/api/missions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: localStorage.getItem("email"),
          subject,
          selectedDate,
          receiver,
          description,
        }),
      });
      return res;
    } catch (err) {
      console.error("Error sending mission request");
    }
  },
};
