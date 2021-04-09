const router = require("express").Router();
const Notifications = require("../utils/Notifications");
const Users = require("../utils/Users");

router.get("/", async (req, res, next) => {
  try {
    const { userEmail } = req.query;

    //Reset notification count for user
    Users.updateNotificationCount(userEmail, "reset");

    const notificationList = await Notifications.getNotifications(userEmail);
    res.json(notificationList);
  } catch (err) {
    console.error("Error getting notifications");
    next();
  }
});

router.get("/bell", async (req, res, next) => {
  try {
    const { userEmail } = req.query;

    const notificationCount = await Users.getNotificationCount(userEmail);
    res.json(notificationCount);
  } catch (err) {
    console.error("Error getting notification count");
    next();
  }
});

module.exports = router;
