const router = require("express").Router();
const Notifications = require("../utils/Notifications");

router.get("/", async (req, res, next) => {
  try {
    const { userEmail } = req.query;

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

    const notificationList = await Notifications.getNotifications(
      userEmail,
      "bell"
    );
    res.json(notificationList.length);
  } catch (err) {
    console.error("Error getting notifications");
    console.log(err);
    next();
  }
});

module.exports = router;
