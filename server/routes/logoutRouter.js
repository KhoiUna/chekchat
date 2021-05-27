const router = require("express").Router();

router.delete("/", (req, res, next) => {
  try {
    //Destroy the current session
    req.session.destroy((err) => {
      console.error("Cannot destroy session");
    });

    res.clearCookie("sid", { path: "/" }).send("ok");
  } catch (err) {
    console.error("Error logging out user");
    next();
  }
});

module.exports = router;
