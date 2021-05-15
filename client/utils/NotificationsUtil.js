import { origin } from "../config/config";

export default class NotificationsUtil {
  static async fetchNotificationsList() {
    try {
      const res = await fetch(
        `${origin}/api/notifications?userEmail=${localStorage.getItem("email")}`
      );
      const notificationList = await res.json();
      return notificationList;
    } catch (err) {
      console.error("Error getting notifications list");
    }
  }

  static async fetchNotificationCountForBell() {
    try {
      const res = await fetch(
        `${origin}/api/notifications/bell?userEmail=${localStorage.getItem(
          "email"
        )}`
      );
      const notificationCount = await res.json();
      return notificationCount;
    } catch (err) {
      console.error("Error getting notification count");
    }
  }
}
