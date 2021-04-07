import { origin } from "../config/config";

module.exports = {
  async sendMissionRequest(subject, selectedDate, receiverEmail, description) {
    try {
      const res = await fetch(`${origin}/api/missions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: localStorage.getItem("email"),
          subject,
          selectedDate: new Date(selectedDate).toUTCString(),
          receiverEmail,
          description,
        }),
      });
      return res;
    } catch (err) {
      console.error("Error sending mission request");
    }
  },
  async fetchMissionRequestsList(position) {
    try {
      const res = await fetch(
        `${origin}/api/missions?email=${localStorage.getItem(
          "email"
        )}&position=${position}`
      );
      const missionRequestList = await res.json();
      return missionRequestList;
    } catch (err) {
      console.error(`Error getting ${position} mission requests`);
    }
  },
  async fetchMissionInfo(requestId) {
    try {
      const res = await fetch(
        `${origin}/api/missions/${requestId}?email=${localStorage.getItem(
          "email"
        )}`
      );
      const missionInfo = await res.json();
      return missionInfo;
    } catch (err) {
      console.error(`Error getting mission info`);
    }
  },
  async fetchMissionTodoList() {
    try {
      const res = await fetch(
        `${origin}/api/todo?email=${localStorage.getItem("email")}`
      );
      const missionTodoList = await res.json();
      return missionTodoList;
    } catch (err) {
      console.error(`Error getting mission todo list`);
    }
  },
};
