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
    const { requestId } = req.body;

    if (!(await Missions.updateVisibility(requestId)))
      return res.status(400).send("Sorry, something is wrong");

    res.json("ok");
  } catch (err) {
    console.error("Error updating mission request's visibility");
    next();
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const { requestId } = req.body;

    const deletedCount = await Missions.deletePendingRequest(requestId);
    if (!deletedCount) return res.status(400).send("Sorry, something is wrong");

    if (deletedCount === 0)
      return res.status(404).send("Task is already accepted or rejected");

    console.log(deletedCount);
    res.json("ok");
  } catch (err) {
    console.error("Error deleting pending mission request");
    next();
  }
});

module.exports = router;
