const router = require("express").Router();
const RequestAccessController = require("../controllers/requestAccess.controller");

router.post("/", RequestAccessController.requestAccess);

module.exports = router;
