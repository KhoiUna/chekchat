const redirectMain = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/api/user");
  }
  next();
};
module.exports = redirectMain;
