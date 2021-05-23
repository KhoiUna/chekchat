const router = require("express").Router();
const UsersUtil = require("../utils/UsersUtil");

router.get("/", async (req, res, next) => {
  try {
    const userInfo = await UsersUtil.getUser(req.session.user.email);
    res.json(userInfo);
  } catch (err) {
    console.error("Error getting user info");
    next();
  }
});

module.exports = router;
