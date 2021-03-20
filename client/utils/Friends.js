import { origin } from "../config/config";

module.exports = {
  async fetchFriendList() {
    const friendList = [];
    return friendList;
  },
  async fetchFriendRequestsList() {
    try {
      const res = await fetch(
        `${origin}/api/friends/requests?userEmail=${localStorage.getItem(
          "email"
        )}`
      );
      const friendRequestList = await res.json();
      return friendRequestList;
    } catch (err) {
      console.error("Error getting friend request list");
    }
  },
  async sendFriendRequest(requestEmail) {
    try {
      const res = await fetch(`${origin}/api/friends/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: localStorage.getItem("email"),
          requestEmail,
        }),
      });
      return res;
    } catch (err) {
      console.error("Error sending friend request");
    }
  },
};
