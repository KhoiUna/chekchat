const router = require("express").Router();
const FeedbackUtil = require("../utils/FeedbackUtil");

router.post("/", async (req, res, next) => {
  try {
    const { subject, comment } = req.body;

    if (!subject || !comment) return res.status(400).send("Invalid feedback");

    if (
      !(await FeedbackUtil.saveFeedback(
        subject,
        comment,
        req.session.user.email
      ))
    )
      return res.status(400).send("Sorry, something is wrong");

    res.json("ok");
  } catch (err) {
    console.error("Error saving feedback");
    next();
  }
});

module.exports = router;
