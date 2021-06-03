const UsersController = require("../controllers/users.controller");
const router = require("express").Router();

router.post("/", UsersController.postFeedback);

module.exports = router;
