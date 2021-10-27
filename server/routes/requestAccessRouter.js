const router = require("express").Router();
const RequestAccessController = require("../controllers/requestAccess.controller");

router.post("/", RequestAccessController.requestAccess);
router.put("/", RequestAccessController.updateAccess);

module.exports = router;
