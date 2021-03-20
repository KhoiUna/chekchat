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
  async sendFriendRequest(email) {
    const res = await fetch(`${origin}/api/friends/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return res;
  },
};
