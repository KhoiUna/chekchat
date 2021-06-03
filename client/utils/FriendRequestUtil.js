import { origin } from "../config/config";

export default class FriendRequestUtil {
  static async fetchSentFriendRequestsList() {
    try {
      const res = await fetch(`${origin}/api/user/friends/requests/sent`, {
        credentials: "include",
      });
      const friendRequestList = await res.json();
      return friendRequestList;
    } catch (err) {
      console.error("Error getting friend request list");
    }
  }

  static async fetchReceivedFriendRequestsList() {
    try {
      const res = await fetch(`${origin}/api/user/friends/requests/received`, {
        credentials: "include",
      });
      const friendRequestList = await res.json();
      return friendRequestList;
    } catch (err) {
      console.error("Error getting friend request list");
    }
  }

  static async sendFriendRequest(requestEmail) {
    try {
      const res = await fetch(`${origin}/api/user/friends/requests`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestEmail,
        }),
      });
      return res;
    } catch (err) {
      console.error("Error sending friend request");
    }
  }
}
