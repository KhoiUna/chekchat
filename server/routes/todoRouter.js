const router = require("express").Router();
const UsersController = require("../controllers/users.controller");

router.get("/", UsersController.getMissionTodoList);

module.exports = router;
