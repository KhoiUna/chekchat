const client = require("../db/client");
const PasswordHelper = require("../helpers/PasswordHelper");

module.exports = class UsersUtil {
  static async saveUser(username, email, password) {
    try {
      const collection = client.db("chekchat").collection("users");

      const response = await collection.insertOne({
        username,
        email,
        password: await PasswordHelper.hashPassword(password),
        avatarURL:
          "https://ik.imagekit.io/chekchat/default-avatar_TAffG0nED.png",
      });
      return response;
    } catch (err) {
      console.error("Error saving user");
      return null;
    }
  }

  static async checkUser(email) {
    try {
      const collection = client.db("chekchat").collection("users");

      const user = await collection.findOne({ email });
      if (user) return true;

      return false;
    } catch (err) {
      console.error("Error checking user");
      return null;
    }
  }

  static async loginUser(email, password) {
    try {
      const collection = client.db("chekchat").collection("users");

      const user = await collection.findOne({ email });

      if (!(await PasswordHelper.comparePassword(password, user.password)))
        return false;

      return {
        username: user.username,
        email: user.email,
      };
    } catch (err) {
      console.error("Error logging in user");
    }
  }

  static async checkAlreadyFriend(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friends");

      const friend = await collection.findOne({
        email: userEmail,
        "friend.email": requestEmail,
      });
      if (friend) return true;

      return false;
    } catch (err) {
      console.error("Error checking user's friends");
      return null;
    }
  }

  static async getUser(email) {
    try {
      const collection = client.db("chekchat").collection("users");

      const user = await collection.findOne({
        email,
      });
      return {
        email: user.email,
        username: user.username,
        avatarURL: user.avatarURL,
      };
    } catch (err) {
      console.error("Error getting user");
    }
  }

  static async addFriend(userEmail, friendEmail) {
    try {
      const collection = client.db("chekchat").collection("friends");

      const addFriendToFirstUser = await collection.insertOne({
        email: userEmail,
        friend: await this.getUser(friendEmail),
      });
      const addFriendToSecondUser = await collection.insertOne({
        email: friendEmail,
        friend: await this.getUser(userEmail),
      });

      return addFriendToFirstUser && addFriendToSecondUser;
    } catch (err) {
      console.error("Error adding friend to user");
      return null;
    }
  }

  static async getFriendList(userEmail) {
    try {
      const collection = client.db("chekchat").collection("friends");

      const friendList = await collection
        .find({
          email: userEmail,
        })
        .toArray();
      return friendList;
    } catch (err) {
      console.error("Error getting friend list");
      return null;
    }
  }

  static async updateNotificationCount(userEmail, action) {
    try {
      const collection = client.db("chekchat").collection("users");

      if (action === "reset") {
        const response = await collection.updateOne(
          {
            email: userEmail,
          },
          { $set: { notificationCount: 0 } }
        );
        if (!response) return false;

        return response;
      }

      const response = await collection.updateOne(
        {
          email: userEmail,
        },
        { $inc: { notificationCount: 1 } }
      );
      if (!response) return false;

      return response;
    } catch (err) {
      console.error("Error updating notification count");
    }
  }

  static async getNotificationCount(userEmail) {
    try {
      const collection = client.db("chekchat").collection("users");

      const { notificationCount } = await collection.findOne({
        email: userEmail,
      });

      return notificationCount;
    } catch (err) {
      console.error("Error getting notification count");
      return null;
    }
  }

  static async updateAvatarURL(userEmail, avatarURL) {
    try {
      const userCollection = client.db("chekchat").collection("users");
      const userResponse = await userCollection.updateOne(
        {
          email: userEmail,
        },
        { $set: { avatarURL } }
      );

      const friendCollection = client.db("chekchat").collection("friends");
      const friendResponse = await friendCollection.updateMany(
        {
          "friend.email": userEmail,
        },
        { $set: { avatarURL } }
      );

      if (!userResponse || !friendResponse) return false;

      return true;
    } catch (err) {
      console.error("Error updating user avatar --util");
      return;
    }
  }
};
