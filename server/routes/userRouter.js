const router = require("express").Router();
const UsersController = require("../controllers/users.controller");
const passport = require("passport");
const redirectMain = require("../middlewares/redirectMain");
const redirectLogin = require("../middlewares/redirectLogin");

//register, login & logout route
router.post("/register", UsersController.register);
router.post(
  "/login",
  redirectMain,
  passport.authenticate("local", {
    successRedirect: "/api/user",
    failureRedirect: "/api/user/login",
  })
);
router.delete("/logout", redirectLogin, UsersController.logout);

//user route
router.get("/", redirectLogin, UsersController.getUserInfo);

//notification route
router.get("/notifications", redirectLogin, UsersController.getNotifications);
router.get(
  "/notifications/bell",
  redirectLogin,
  UsersController.getNotificationCount
);

//chat route
router.get("/chat/rooms", redirectLogin, UsersController.getChatRooms);
router.get(
  "/chat/room/:roomId",
  redirectLogin,
  UsersController.getChatRoomTitle
);
router.get(
  "/chat/messages/:roomId",
  redirectLogin,
  UsersController.getChatMessages
);

//profile route
router.get("/profile/updateAvatar/auth", UsersController.authToUpdateAvatar);
router.post(
  "/profile/updateAvatar",
  redirectLogin,
  UsersController.updateAvatar
);

//mission route
router.get("/missions", redirectLogin, UsersController.getMissionRequest);
router.get(
  "/missions/:requestId",
  redirectLogin,
  UsersController.getMissionInfo
);
router.post("/missions", redirectLogin, UsersController.sendMissionRequest);
router.put("/missions", redirectLogin, UsersController.updateMissionVisibility);
router.delete("/missions", redirectLogin, UsersController.deletePendingMission);

//todo route
router.get("/todo", redirectLogin, UsersController.getMissionTodoList);

//friend route
router.get(
  "/friends/requests/sent",
  redirectLogin,
  UsersController.getSentFriendRequestList
);
router.get(
  "/friends/requests/received",
  redirectLogin,
  UsersController.getReceivedFriendRequestList
);
router.post(
  "/friends/requests",
  redirectLogin,
  UsersController.sendFriendRequest
);
router.get("/friends", redirectLogin, UsersController.getFriendList);

//feedback route
router.post("/feedback", redirectLogin, UsersController.postFeedback);

module.exports = router;
