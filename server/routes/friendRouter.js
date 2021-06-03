const UsersController = require("../controllers/users.controller");
const router = require("express").Router();

router.get("/requests/sent", UsersController.getSentFriendRequestList);
router.get("/requests/received", UsersController.getReceivedFriendRequestList);
router.post("/requests", UsersController.sendFriendRequest);
router.get("/", UsersController.getFriendList);

module.exports = router;
