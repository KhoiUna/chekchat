import { origin } from "../config/config";

module.exports = {
  async fetchFriendList() {
    try {
      const res = await fetch(
        `${origin}/api/friends?userEmail=${localStorage.getItem("email")}`
      );
      const friendList = await res.json();
      return friendList;
    } catch (err) {
      console.error("Error getting friend list");
    }
  },
};
