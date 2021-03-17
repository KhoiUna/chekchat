const jwt = require("jsonwebtoken");

module.exports = (userObj) => {
  const d = new Date().getTime() + 2 * 60 * 60 * 1000;
  return jwt.sign(userObj, process.env.TOKEN_SECRET, {
    expiresIn: d,
  });
};
