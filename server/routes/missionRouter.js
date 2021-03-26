const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    res.send("ok");
  } catch (err) {
    console.error("Error saving mission request");
  }
});

module.exports = router;
