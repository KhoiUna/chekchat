const router = require("express").Router();
const UsersController = require("../controllers/users.controller");

router.get("/", UsersController.getNotifications);
router.get("/bell", UsersController.getNotificationCount);

module.exports = router;
