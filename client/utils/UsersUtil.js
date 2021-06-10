import { origin } from "../config/config";
import stringifyCookies from "../helpers/stringifyCookies";

export default class UsersUtil {
  static async fetchUserInfo() {
    try {
      const res = await fetch(`${origin}/api/user`, {
        credentials: "include",
      });
      const userInfo = await res.json();
      return userInfo;
    } catch (err) {
      console.error("Error getting user info");
    }
  }

  static async fetchUserInfoServerSide(cookieObj) {
    try {
      const response = await fetch(origin + "/api/user", {
        credentials: "include",
        headers: {
          cookie: stringifyCookies(cookieObj),
        },
      });

      const userInfo = await response.json();
      return userInfo;
    } catch (err) {
      console.error("Error getting user info");
      return;
    }
  }

  static async updateUserAvatar(avatarPath) {
    try {
      const res = await fetch(`${origin}/api/user/profile/updateAvatar`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatarPath }),
      });

      if (res.ok === true) return true;

      return false;
    } catch (err) {
      console.error("Error updating user avatar");
      return;
    }
  }
}
