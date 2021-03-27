const router = require("express").Router();
const ValidationHelper = require("../helpers/ValidationHelper");

router.post("/", async (req, res) => {
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

    res.send("ok");
  } catch (err) {
    console.error("Error saving mission request");
    console.error(err);
  }
});

module.exports = router;
