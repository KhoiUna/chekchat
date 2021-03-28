const router = require("express").Router();
const ValidationHelper = require("../helpers/ValidationHelper");
const Missions = require("../utils/Missions");

router.get("/", async (req, res, next) => {
  try {
    const { email, position } = req.query;

    const missionRequestList = await Missions.getMissionRequest(
      position,
      email
    );
    res.json(missionRequestList);
  } catch (err) {
    console.error("Error getting mission requests");
    next();
  }
});

router.get("/:requestId", async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const missionInfo = await Missions.getMissionInfo(requestId);
    res.json(missionInfo);
  } catch (err) {
    console.error("Error getting mission info");
    next();
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

    //If request email is user's email, block it
    if (userEmail === receiverEmail)
      return res.status(400).send("Cannot send request to yourself");

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
      !(await Missions.saveMissionRequest(
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

router.put("/", async (req, res, next) => {
  try {
    const { action, requestId } = req.body;
    console.log(action, requestId);
    //Update mission request
    // if (!(await Missions.updateRequest(requestId, action)))
    //   return res.status(400).send("Sorry, something is wrong");

    res.send("ok");
  } catch (err) {
    console.error("Error updating mission request");
    next();
  }
});

module.exports = router;
