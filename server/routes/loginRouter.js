const router = require("express").Router();
const Users = require("../utils/Users");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(await Users.loginUser(email, password)))
      return res.status(401).send("Invalid username or password");

    res.send("ok");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
