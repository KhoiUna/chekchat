const router = require("express").Router();
const Users = require("../utils/Users");
const generateJWT = require("../helpers/generateJWT");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userObj = await Users.getUser(email, password);
    if (!userObj) return res.status(401).send("Invalid username or password");

    const token = generateJWT(userObj);
    res.json({ email, token });
  } catch (err) {
    console.error("Error logging in user");
  }
});

module.exports = router;
