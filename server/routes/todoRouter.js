const router = require("express").Router();
const Missions = require("../utils/Missions");

router.get("/", async (req, res, next) => {
  try {
    const { email } = req.query;

    const missionTodoList = await Missions.getMissionTodoList(email);
    res.json(missionTodoList);
  } catch (err) {
    console.error("Error getting mission todo list");
    next();
  }
});

module.exports = router;
