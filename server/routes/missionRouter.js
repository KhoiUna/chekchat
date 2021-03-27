const router = require("express").Router();
const ValidationHelper = require("../helpers/ValidationHelper");
const { saveMissionRequest } = require("../utils/Missions");

router.get("/", async (req, res, next) => {
  try {
    //
  } catch (err) {
    console.error("Error getting mission requests");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      userEmail,
      subject,
      selectedDate,
      receiverEmail,
      description,
    } = req.body;

    if (
      !ValidationHelper.validateMission(
        userEmail,
        subject,
        selectedDate,
        receiverEmail,
        description
      )
    )
      return res.status(400).send("Invalid data");

    //Save to db
    if (
      !(await saveMissionRequest(
        userEmail,
        subject,
        selectedDate,
        receiverEmail,
        description
      ))
    )
      return res.status(400).send("Sorry, something is wrong");

    res.send("ok");
  } catch (err) {
    console.error("Error saving mission request");
    next();
  }
});

module.exports = router;
