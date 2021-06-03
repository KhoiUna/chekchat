const UsersController = require("../controllers/users.controller");
const router = require("express").Router();

router.delete("/", UsersController.logout);

module.exports = router;
