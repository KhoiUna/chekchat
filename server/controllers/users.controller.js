const { cookieSameSite, cookieSecurity } = require("../config/config");
const UsersUtil = require("../utils/UsersUtil");
const generateJWT = require("../helpers/generateJWT");
const FeedbackUtil = require("../utils/FeedbackUtil");
const FriendRequestUtil = require("../utils/FriendRequestUtil");
const ValidationHelper = require("../helpers/ValidationHelper");
const MissionsUtil = require("../utils/MissionsUtil");
const NotificationsUtil = require("../utils/NotificationsUtil");
const ImageKit = require("imagekit");
const ChatUtil = require("../utils/ChatUtil");

module.exports = class UsersController {
  //register, login & logout route
  static async register(req, res, next) {
    try {
      const { username, email, password, confirmPassword } = req.body;
      //Validate data
      const validation = await ValidationHelper.forRegistration(
        username,
        email,
        password,
        confirmPassword
      );
      if (validation !== true) return res.status(400).json(validation);

      //Check user
      if (await UsersUtil.checkUser(email))
        return res.status(400).send("Email already used");

      //Save user
      if (await UsersUtil.saveUser(username, email, password))
        return res.send("ok");

      res.status(400).send("Sorry, something is wrong");
    } catch (err) {
      console.error("Error in registering user");
      next();
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userObj = await UsersUtil.loginUser(email, password);
      if (!userObj) return res.status(401).send("Invalid username or password");

      const token = generateJWT(userObj);

      res
        .cookie("loggedIn", true, {
          path: "/",
          expires: new Date(Date.now() + 2 * 3600000), //expires after 2 hours
          maxAge: 2 * 3600 * 1000, // 2 hours
          sameSite: cookieSameSite,
          secure: cookieSecurity,
          httpOnly: true,
        })
        .json("ok");
    } catch (err) {
      console.error("Error logging in user");
      next();
    }
  }
  static async logout(req, res, next) {
    try {
      req.logout();
      req.session.destroy((err) => {
        if (err) console.error(err);
      });

      res.clearCookie("sid", { path: "/" });

      res.send("ok");
    } catch (err) {
      console.error("Error logging out user");
      next();
    }
  }

  //user route
  static async getUserInfo(req, res, next) {
    try {
      const userInfo = await UsersUtil.getUser(req.user.id);
      res.json(userInfo);
    } catch (err) {
      console.error("Error getting user info");
      next();
    }
  }

  //notification route
  static async getNotifications(req, res, next) {
    try {
      //Reset notification count for user
      UsersUtil.updateNotificationCount(req.user.id, "reset");

      const notificationList = await NotificationsUtil.getNotifications(
        req.user.id
      );
      res.json(notificationList);
    } catch (err) {
      console.error("Error getting notifications");
      console.error(err);
      next();
    }
  }
  static async getNotificationCount(req, res, next) {
    try {
      const notificationCount = await UsersUtil.getNotificationCount(
        req.user.id
      );
      res.json(notificationCount);
    } catch (err) {
      console.error("Error getting notification count");
      next();
    }
  }

  //chat route
  static async getChatRooms(req, res, next) {
    try {
      const chatRooms = await ChatUtil.getChatRooms({
        userId: req.user.id,
        position: req.query.position,
      });
      res.json(chatRooms);
    } catch (err) {
      console.error("Error getting chat rooms");
      next();
    }
  }
  static async getChatRoomTitle(req, res, next) {
    try {
      const roomTitle = await ChatUtil.getChatRoomTitle({
        roomId: req.params.roomId,
      });
      res.json(roomTitle);
    } catch (err) {
      console.error("Error getting chat room title");
      next();
    }
  }
  static async getChatMessages(req, res, next) {
    try {
      const chatMessages = await ChatUtil.getChatMessages({
        roomId: req.params.roomId,
        queryLimit: req.query.queryLimit,
      });
      res.json(chatMessages);
    } catch (err) {
      console.error("Error getting chat messages");
      next();
    }
  }

  //profile route
  static authToUpdateAvatar(req, res, next) {
    const imagekit = new ImageKit({
      urlEndpoint: process.env.IMGKIT_URL_ENDPOINT,
      publicKey: process.env.IMGKIT_PUBLIC_KEY,
      privateKey: process.env.IMGKIT_PRIVATE_KEY,
    });

    const result = imagekit.getAuthenticationParameters();

    res.send(result);
    next();
  }
  static async updateAvatar(req, res, next) {
    try {
      const avatarURL = req.body.avatarPath;

      if (!(await UsersUtil.updateAvatarURL(req.user.id, avatarURL)))
        return res.status(400).send("Sorry, something is wrong");

      res.send("ok");
    } catch (err) {
      console.error("Error updating user avatar");
      next();
    }
  }

  //mission route
  static async getMissionRequest(req, res, next) {
    try {
      const { position } = req.query;

      const missionRequestList = await MissionsUtil.getMissionRequest(
        position,
        req.user.id
      );
      res.json(missionRequestList);
    } catch (err) {
      console.error("Error getting mission requests");
      next();
    }
  }
  static async getMissionInfo(req, res, next) {
    try {
      const { requestId } = req.params;

      const missionInfo = await MissionsUtil.getMissionInfo(requestId);
      res.json(missionInfo);
    } catch (err) {
      console.error("Error getting mission info");
      next();
    }
  }
  static async sendMissionRequest(req, res, next) {
    try {
      const userEmail = req.user.email;
      const { subject, selectedDate, receiverEmail, description } = req.body;

      //If request email is user's email, block it
      if (userEmail === receiverEmail)
        return res.status(400).send("Cannot send request to yourself");

      if (
        !(await ValidationHelper.validateMission(
          userEmail,
          subject,
          selectedDate,
          receiverEmail,
          description
        ))
      )
        return res.status(400).send("Invalid data");

      //Save to db
      if (
        !(await MissionsUtil.saveMissionRequest(
          userEmail,
          subject,
          selectedDate,
          receiverEmail,
          description
        ))
      )
        return res.status(400).send("Sorry, something is wrong");

      res.send("ok");
    } catch (err) {
      console.error("Error saving mission request");
      next();
    }
  }
  static async updateMissionVisibility(req, res, next) {
    try {
      const { requestId } = req.body;

      if (!(await MissionsUtil.updateVisibility(requestId)))
        return res.status(400).send("Sorry, something is wrong");

      res.json("ok");
    } catch (err) {
      console.error("Error updating mission request's visibility");
      next();
    }
  }
  static async deletePendingMission(req, res, next) {
    try {
      const { requestId } = req.body;

      const deletedCount = await MissionsUtil.deletePendingRequest(requestId);
      if (!deletedCount)
        return res.status(400).send("Sorry, something is wrong");

      if (deletedCount === 0)
        return res.status(404).send("Task is already accepted or rejected");

      res.json("ok");
    } catch (err) {
      console.error("Error deleting pending mission request");
      next();
    }
  }

  //todo route
  static async getMissionTodoList(req, res, next) {
    try {
      const missionTodoList = await MissionsUtil.getMissionTodoList(
        req.user.id
      );
      res.json(missionTodoList);
    } catch (err) {
      console.error("Error getting mission todo list");
      next();
    }
  }

  //friend route
  static async getSentFriendRequestList(req, res, next) {
    try {
      const friendRequestList =
        await FriendRequestUtil.getSentFriendRequestList(req.user.id);
      res.json(friendRequestList);
    } catch (err) {
      console.error("Error getting sent friend request");
      next();
    }
  }
  static async getReceivedFriendRequestList(req, res, next) {
    try {
      const friendRequestList =
        await FriendRequestUtil.getReceivedFriendRequestList(req.user.id);
      res.json(friendRequestList);
    } catch (err) {
      console.error("Error getting received friend request");
      next();
    }
  }
  static async sendFriendRequest(req, res, next) {
    try {
      const userEmail = req.user.email;
      const { requestEmail } = req.body;
      //Validate email
      const validation = await ValidationHelper.validateEmail(requestEmail);
      if (!validation) return res.status(400).send("Invalid email");

      //If request email is user's email, block it
      if (userEmail === requestEmail)
        return res.status(400).send("Cannot send request to yourself");

      //Check if request email exists
      const checkEmailExists = await UsersUtil.checkUser(requestEmail);
      if (!checkEmailExists) return res.status(400).send("User does not exist");

      //Check if user is already friend
      const alreadyFriend = await UsersUtil.checkAlreadyFriend(
        userEmail,
        requestEmail
      );
      if (alreadyFriend) return res.status(400).send("User is already friend");

      //Check if request already sent
      const alreadySent = await FriendRequestUtil.checkAlreadySent(
        userEmail,
        requestEmail
      );
      if (alreadySent)
        return res.status(400).send("Request to user already sent");

      //Save request
      if (await FriendRequestUtil.saveRequest(userEmail, requestEmail))
        return res.send("ok");

      res.status(400).send("Sorry, something is wrong");
    } catch (err) {
      console.error("Error sending friend request");
      next();
    }
  }
  static async getFriendList(req, res, next) {
    try {
      const friendList = await UsersUtil.getFriendList(req.user.id);
      res.json(friendList);
    } catch (err) {
      console.error("Error getting friend list");
      next();
    }
  }

  //feedback route
  static async postFeedback(req, res, next) {
    try {
      const { subject, comment } = req.body;

      if (!subject || !comment) return res.status(400).send("Invalid feedback");

      if (!(await FeedbackUtil.saveFeedback(subject, comment, req.user.email)))
        return res.status(400).send("Sorry, something is wrong");

      res.json("ok");
    } catch (err) {
      console.error("Error saving feedback");
      next();
    }
  }
};
