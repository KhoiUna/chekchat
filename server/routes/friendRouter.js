const ValidationHelper = require("../helpers/ValidationHelper");
const FriendRequestUtil = require("../utils/FriendRequestUtil");
const router = require("express").Router();
const UsersUtil = require("../utils/UsersUtil");

router.get("/requests/sent", async (req, res, next) => {
  try {
    const friendRequestList = await FriendRequestUtil.getSentFriendRequestList(
      req.session.user.email
    );
    res.json(friendRequestList);
  } catch (err) {
    console.error("Error getting sent friend request");
    next();
  }
});

router.get("/requests/received", async (req, res, next) => {
  try {
    const friendRequestList =
      await FriendRequestUtil.getReceivedFriendRequestList(
        req.session.user.email
      );
    res.json(friendRequestList);
  } catch (err) {
    console.error("Error getting received friend request");
    next();
  }
});

router.post("/requests", async (req, res, next) => {
  try {
    const userEmail = req.session.user.email;
    const { requestEmail } = req.body;
    //Validate email
    const validation = ValidationHelper.validateEmail(requestEmail);
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
});

router.get("/", async (req, res, next) => {
  try {
    const friendList = await UsersUtil.getFriendList(req.session.user.email);
    res.json(friendList);
  } catch (err) {
    console.error("Error getting friend list");
    next();
  }
});

module.exports = router;
