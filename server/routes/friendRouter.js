const ValidationHelper = require("../helpers/ValidationHelper");
const FriendRequest = require("../utils/FriendRequest");
const router = require("express").Router();
const Users = require("../utils/Users");

router.get("/requests", async (req, res, next) => {
  try {
    const userEmail = req.query.userEmail;
    const friendRequestList = await FriendRequest.getFriendRequestList(
      userEmail
    );
    res.json(friendRequestList);
  } catch (err) {
    console.error("Error getting friend request");
  }
});

router.post("/requests", async (req, res, next) => {
  try {
    const { userEmail, requestEmail } = req.body;
    //Validate email
    const validation = ValidationHelper.validateEmail(requestEmail);
    if (!validation) return res.status(400).send("Invalid email");

    //If request email is user's email, block it
    if (userEmail === requestEmail)
      return res.status(400).send("Cannot send request to yourself");

    //Check if request email exists
    const checkEmailExists = await Users.checkUser(requestEmail);
    if (!checkEmailExists) return res.status(400).send("User does not exist");

    //Check if user is already friend
    const alreadyFriend = await Users.checkAlreadyFriend(
      userEmail,
      requestEmail
    );
    if (alreadyFriend) return res.status(400).send("User is already friend");

    //Check if request already sent
    const alreadySent = await FriendRequest.checkAlreadySent(
      userEmail,
      requestEmail
    );
    if (alreadySent)
      return res.status(400).send("Request to user already sent");

    //Save request
    if (await FriendRequest.saveRequest(userEmail, requestEmail))
      return res.send("ok");

    res.status(400).send("Sorry, something is wrong");
  } catch (err) {
    console.error("Error sending friend request");
    next();
  }
});

module.exports = router;
