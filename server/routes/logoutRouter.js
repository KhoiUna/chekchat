const LogoutMiddleware = require("../middlewares/LogoutMiddleware");
const router = require("express").Router();

router.delete(
  "/",
  LogoutMiddleware.destroySession,
  LogoutMiddleware.clearCookies,
  (req, res, next) => {
    try {
      res.send("ok");
    } catch (err) {
      console.error("Error logging out user");
      next();
    }
  }
);

module.exports = router;
