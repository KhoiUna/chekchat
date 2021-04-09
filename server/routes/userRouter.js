const router = require("express").Router();
const Users = require("../utils/Users");

router.get("/", async (req, res, next) => {
  try {
    const { userEmail } = req.query;

    const userInfo = await Users.getUser(userEmail);
    res.json(userInfo);
  } catch (err) {
    console.error("Error getting user info");
    next();
  }
});

module.exports = router;
