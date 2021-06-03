const router = require("express").Router();
const UsersController = require("../controllers/users.controller");

//login, register & logout route
router.post("/login", UsersController.login);
router.post("/register", UsersController.register);
router.delete("/logout", UsersController.logout);

//user route
router.get("/", UsersController.getUserInfo);

//notification route
router.get("/notifications", UsersController.getNotifications);
router.get("/notifications/bell", UsersController.getNotificationCount);

//mission route
router.get("/missions", UsersController.getMissionRequest);
router.get("/missions/:requestId", UsersController.getMissionInfo);
router.post("/missions", UsersController.sendMissionRequest);
router.put("/missions", UsersController.updateMissionVisibility);
router.delete("/missions", UsersController.deletePendingMission);

//todo route
router.get("/todo", UsersController.getMissionTodoList);

//friend route
router.get("/friends/requests/sent", UsersController.getSentFriendRequestList);
router.get(
  "/friends/requests/received",
  UsersController.getReceivedFriendRequestList
);
router.post("/friends/requests", UsersController.sendFriendRequest);
router.get("/friends", UsersController.getFriendList);

//feedback route
router.post("/feedback", UsersController.postFeedback);

module.exports = router;
