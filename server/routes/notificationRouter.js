const router = require("express").Router();
const NotificationsUtil = require("../utils/NotificationsUtil");
const UsersUtil = require("../utils/UsersUtil");

router.get("/", async (req, res, next) => {
  try {
    const { userEmail } = req.query;

    //Reset notification count for user
    UsersUtil.updateNotificationCount(userEmail, "reset");

    const notificationList = await NotificationsUtil.getNotifications(
      userEmail
    );
    res.json(notificationList);
  } catch (err) {
    console.error("Error getting notifications");
    next();
  }
});

router.get("/bell", async (req, res, next) => {
  try {
    const { userEmail } = req.query;

    const notificationCount = await UsersUtil.getNotificationCount(userEmail);
    res.json(notificationCount);
  } catch (err) {
    console.error("Error getting notification count");
    next();
  }
});

module.exports = router;
