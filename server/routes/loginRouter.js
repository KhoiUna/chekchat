const router = require("express").Router();
const UsersController = require("../controllers/users.controller");

router.post("/", UsersController.login);

module.exports = router;
