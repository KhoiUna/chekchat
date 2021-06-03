const router = require("express").Router();
const UsersUtil = require("../utils/UsersUtil");
const generateJWT = require("../helpers/generateJWT");
const { cookieSameSite, cookieSecurity } = require("../config/config");

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userObj = await UsersUtil.loginUser(email, password);
    if (!userObj) return res.status(401).send("Invalid username or password");

    const token = generateJWT(userObj);
    req.session.user = userObj; //save user to session store

    res
      .cookie("loggedIn", true, {
        path: "/",
        expires: new Date(Date.now() + 2 * 3600000), //expires after 2 hours
        maxAge: 2 * 3600 * 1000, // 2 hours
        sameSite: cookieSameSite,
        secure: cookieSecurity,
        httpOnly: true,
      })
      .json("ok");
  } catch (err) {
    console.error("Error logging in user");
    next();
  }
});

module.exports = router;
