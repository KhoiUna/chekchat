import { origin } from "../config/config";

export default class FriendsUtil {
  static async fetchFriendList() {
    try {
      const res = await fetch(
        `${origin}/api/friends?userEmail=${localStorage.getItem("email")}`,
        {
          credentials: "include",
        }
      );
      const friendList = await res.json();
      return friendList;
    } catch (err) {
      console.error("Error getting friend list");
    }
  }
}
