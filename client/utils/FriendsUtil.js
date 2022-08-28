import { origin } from "../config/config";

export default class FriendsUtil {
  static async fetchFriendList() {
    try {
      const res = await fetch(`${origin}/api/user/friends`, {
        credentials: "include",
      });
      const friendList = await res.json();
      return friendList;
    } catch (err) {
      console.error("Error getting friend list");
    }
  }
}
