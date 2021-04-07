const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const { email } = req.query;

    const notificationList = await Notification.getMissionRequest(email);
    res.json(notificationList);
  } catch (err) {
    console.error("Error getting notifications");
    next();
  }
});

module.exports = router;
