const router = require("express").Router();

router.delete("/", (req, res, next) => {
  try {
    res.clearCookie("sid", { path: "/" }).send("ok");
  } catch (err) {
    console.error("Error logging out user");
    next();
  }
});

module.exports = router;
