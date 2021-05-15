const router = require("express").Router();
const ValidationHelper = require("../helpers/ValidationHelper");
const UsersUtil = require("../utils/UsersUtil");

router.post("/", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    //Validate data
    const validation = ValidationHelper.forRegistration(
      username,
      email,
      password,
      confirmPassword
    );
    if (validation !== true) return res.send(validation);

    //Check user
    if (await UsersUtil.checkUser(email)) return res.send("Email already used");

    //Save user
    if (await UsersUtil.saveUser(username, email, password))
      return res.send("ok");

    res.send("Sorry, something is wrong");
  } catch (err) {
    console.error("Error in register router");
    next();
  }
});

module.exports = router;
