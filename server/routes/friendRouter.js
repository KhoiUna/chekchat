const ValidationHelper = require("../helpers/ValidationHelper");
const router = require("express").Router();
const Users = require("../utils/Users");

router.post("/requests", async (req, res) => {
  try {
    const { email } = req.body;
    //Validate email
    const validation = ValidationHelper.validateEmail(email);
    if (!validation) return res.status(400).send("Invalid email");

    //Check if user is already friend
    const alreadyFriend = ValidationHelper.validateEmail(email);
    if (alreadyFriend) return res.status(400).send("User is already friend");

    //Check if request already sent
    //

    res.send("ok");
  } catch (err) {
    console.error("Error saving friend request");
    next();
  }
});

module.exports = router;
