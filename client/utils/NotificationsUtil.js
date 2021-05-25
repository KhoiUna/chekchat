import { origin } from "../config/config";
import stringifyCookies from "../helpers/stringifyCookies";

export default class NotificationsUtil {
  static async fetchNotificationsList() {
    try {
      const res = await fetch(
        `${origin}/api/notifications?userEmail=${localStorage.getItem(
          "email"
        )}`,
        {
          credentials: "include",
        }
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
        )}`,
        {
          credentials: "include",
        }
      );
      const notificationCount = await res.json();
      return notificationCount;
    } catch (err) {
      console.error("Error getting notification count");
    }
  }

  static async fetchNotificationCountForBellServerSide(cookieObj) {
    try {
      const res = await fetch(`${origin}/api/notifications/bell`, {
        credentials: "include",
        headers: {
          cookie: stringifyCookies(cookieObj),
        },
      });
      const notificationCount = await res.json();
      return notificationCount;
    } catch (err) {
      console.error("Error getting notification count");
      return;
    }
  }
}
