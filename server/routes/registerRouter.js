const router = require("express").Router();
const UsersController = require("../controllers/users.controller");

router.post("/", UsersController.register);

module.exports = router;
