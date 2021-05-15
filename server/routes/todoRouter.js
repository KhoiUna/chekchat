const router = require("express").Router();
const MissionsUtil = require("../utils/MissionsUtil");

router.get("/", async (req, res, next) => {
  try {
    const { email } = req.query;

    const missionTodoList = await MissionsUtil.getMissionTodoList(email);
    res.json(missionTodoList);
  } catch (err) {
    console.error("Error getting mission todo list");
    next();
  }
});

module.exports = router;
