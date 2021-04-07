import { origin } from "../config/config";

module.exports = {
  async fetchNotificationsList() {
    try {
      const res = await fetch(
        `${origin}/api/notifications?userEmail=${localStorage.getItem("email")}`
      );
      const notificationList = await res.json();
      return notificationList;
    } catch (err) {
      console.error("Error getting notifications list");
    }
  },
  async fetchNotificationsListForBell() {
    try {
      const res = await fetch(
        `${origin}/api/notifications/bell?userEmail=${localStorage.getItem(
          "email"
        )}`
      );
      const notificationList = await res.json();
      return notificationList.length;
    } catch (err) {
      console.error("Error getting notifications list");
    }
  },
};
