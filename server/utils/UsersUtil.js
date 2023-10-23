const { ObjectId } = require("mongodb");
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
        avatarURL: "/default-avatar_TAffG0nED.png",
      });
      return response;
    } catch (err) {
      console.error("Error saving user ---util");
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
      console.error("Error checking user ---util");
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
        id: user._id,
        username: user.username,
        email: user.email,
        avatarURL: user.avatarURL,
      };
    } catch (err) {
      console.error("Error logging in user ---util");
    }
  }

  static async checkAlreadyFriend(userEmail, requestEmail) {
    try {
      const collection = client.db("chekchat").collection("friends");

      const friend = await collection.findOne({
        userId: new ObjectId(await UsersUtil.getUserId(userEmail))(),
        friendId: new ObjectId(await UsersUtil.getUserId(requestEmail))(),
      });
      if (friend) return true;

      return false;
    } catch (err) {
      console.error("Error checking user's friends ---util");
      return null;
    }
  }

  static async getUser(userId) {
    try {
      const collection = client.db("chekchat").collection("users");

      const user = await collection.findOne({
        _id: new ObjectId(userId),
      });
      return {
        email: user.email,
        username: user.username,
        avatarURL: user.avatarURL,
      };
    } catch (err) {
      console.error("Error getting user ---util");
    }
  }

  static async getUserId(email) {
    try {
      const collection = client.db("chekchat").collection("users");

      const user = await collection.findOne({
        email,
      });
      return user._id;
    } catch (err) {
      console.error("Error getting user id ---util");
      return;
    }
  }

  static async addFriend({ userId, friendId }) {
    try {
      const collection = client.db("chekchat").collection("friends");

      const addFriendToFirstUser = await collection.insertOne({
        userId: new ObjectId(userId)(),
        friendId: new ObjectId(friendId)(),
      });
      const addFriendToSecondUser = await collection.insertOne({
        userId: new ObjectId(friendId)(),
        friendId: new ObjectId(userId)(),
      });

      return addFriendToFirstUser && addFriendToSecondUser;
    } catch (err) {
      console.error("Error adding friend to user ---util");
      return null;
    }
  }

  static async getFriendList(userId) {
    try {
      const collection = client.db("chekchat").collection("friends");
      const agg = [
        {
          $match: {
            userId,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "friendId",
            foreignField: "_id",
            as: "friend",
          },
        },
        {
          $project: {
            friend: {
              username: { $arrayElemAt: ["$friend.username", 0] },
              email: { $arrayElemAt: ["$friend.email", 0] },
              avatarURL: { $arrayElemAt: ["$friend.avatarURL", 0] },
            },
          },
        },
      ];

      const friendList = await collection.aggregate(agg).toArray();
      return friendList;
    } catch (err) {
      console.error("Error getting friend list ---util");
      return null;
    }
  }

  static async updateNotificationCount(userId, action) {
    try {
      const collection = client.db("chekchat").collection("users");

      if (action === "reset") {
        const response = await collection.updateOne(
          {
            _id: new ObjectId(userId)(),
          },
          { $set: { notificationCount: 0 } }
        );
        if (!response) return false;

        return response;
      }

      const response = await collection.updateOne(
        {
          _id: userId,
        },
        { $inc: { notificationCount: 1 } }
      );
      if (!response) return false;

      return response;
    } catch (err) {
      console.error("Error updating notification count ---util");
    }
  }

  static async getNotificationCount(userId) {
    try {
      const collection = client.db("chekchat").collection("users");

      const { notificationCount } = await collection.findOne({
        _id: new ObjectId(userId),
      });

      return notificationCount;
    } catch (err) {
      console.error("Error getting notification count ---util");
      return null;
    }
  }

  static async updateAvatarURL(userId, avatarURL) {
    try {
      const userCollection = client.db("chekchat").collection("users");
      const userResponse = await userCollection.updateOne(
        {
          _id: new ObjectId(userId)(),
        },
        { $set: { avatarURL } }
      );

      if (!userResponse) return false;

      return true;
    } catch (err) {
      console.error("Error updating user avatar ---util");
      return;
    }
  }
};
