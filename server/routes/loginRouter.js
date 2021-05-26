const router = require("express").Router();
const UsersUtil = require("../utils/UsersUtil");
const generateJWT = require("../helpers/generateJWT");

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userObj = await UsersUtil.loginUser(email, password);
    if (!userObj) return res.status(401).send("Invalid username or password");

    const token = generateJWT(userObj);
    req.session.user = userObj; //save user to session store

    res.json({ email, token });
  } catch (err) {
    console.error("Error logging in user");
    next();
  }
});

module.exports = router;
