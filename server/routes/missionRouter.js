const router = require("express").Router();
const UsersController = require("../controllers/users.controller");

router.get("/", UsersController.getMissionRequest);
router.get("/:requestId", UsersController.getMissionInfo);
router.post("/", UsersController.sendMissionRequest);
router.put("/", UsersController.updateMissionVisibility);
router.delete("/", UsersController.deletePendingMission);

module.exports = router;
