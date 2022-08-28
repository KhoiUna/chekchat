const redirectLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/api/user/login");
  }
  next();
};
module.exports = redirectLogin;
