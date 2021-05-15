const router = require("express").Router();
const UsersUtil = require("../utils/UsersUtil");

router.get("/", async (req, res, next) => {
  try {
    const { userEmail } = req.query;

    const userInfo = await UsersUtil.getUser(userEmail);
    res.json(userInfo);
  } catch (err) {
    console.error("Error getting user info");
    next();
  }
});

module.exports = router;
