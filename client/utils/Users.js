import { origin } from "../config/config";

module.exports = {
  async fetchUserInfo() {
    try {
      const res = await fetch(
        `${origin}/api/user?userEmail=${localStorage.getItem("email")}`
      );
      const userInfo = await res.json();
      return userInfo;
    } catch (err) {
      console.error("Error getting user info");
    }
  },
};
