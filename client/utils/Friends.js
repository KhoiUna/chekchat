import { origin } from "../config/config";

module.exports = {
  async fetchFriendList() {
    const friendList = [];
    return friendList;
  },
  async fetchFriendRequestsList() {
    const friendRequestList = [];
    return friendRequestList;
  },
  async sendFriendRequest(requestEmail) {
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
  },
};
